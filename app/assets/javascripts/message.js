$(document).on('turbolinks:load', function() { 
  $(function(){
    function buildHTML(message){
      var html = `<div class="message">
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
        $('.submit-btn').removeAttr("disabled");
      });
    });
  });
});