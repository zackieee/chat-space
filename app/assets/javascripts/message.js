$(document).on('turbolinks:load', function() { 
  $(function(){
    function buildHTML(message){
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message__upper-info">
                      <p class="message__upper-info__talker">
                        ${message.name}
                      </p>
                      <p class="message__upper-info__date"> 
                        ${message.created_at}
                      </p>
                    </div>
                    <p class="message__text">${message.body}</p>`

      if(message.image.url !== null){
        html +=`  <img class="message__image" src="${message.image.url}">
                </div>`
      }else {
        html +=`</div>`
      }
      return html;
    }
    function scrollBottom(){
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 2000, 'swing');
    }
    function reloadMessages() {
      var last_message_id = $('.message').last().attr('data-message-id');
      // url指定方法の改善で以下２行は不要になりました。今後の参考までに残しておきます。
      // var group_id = $(location).attr('href').split('/')[4];
      // href = '/groups/' + group_id +'/api/messages';
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {latest_id: last_message_id}
      })
      .done(function(messages) {
        if(messages.length !== 0){
          messages.forEach(function(message){
            var html = buildHTML(message);
            $('.messages').append(html);
          })
          scrollBottom();
        }
      })
      .fail(function() {
        alert('処理に失敗しました');
      })
    };
    $('#new_message').on('submit',function(e){
      e.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        url:          $(this).attr('action'),
        type:         "POST",
        data:         formData,
        dataType:     'json',
        processData:  false,
        contentType:  false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message')[0].reset();
        scrollBottom();
      })
      .fail(function(){
        alert('メッセージを入力してください');
      })
      .always(function(){
        $('.submit-btn').removeAttr('disabled');
      });
    });
    $(document).ready(function(){
      var auto_load;
      var reg = new RegExp('groups/[0-9]+/messages');
      if(reg.test(location.pathname)){
        auto_load = setInterval(function(){
          if(reg.test(location.pathname)){
            reloadMessages();
          }else{
            clearInterval(auto_load);
          }
        },5000);
      }
    });
  });
});