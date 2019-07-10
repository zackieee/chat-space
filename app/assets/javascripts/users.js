$(document).on('turbolinks:load', function() { 
  $(function(){
    var result_list = $(".user-search-result");
    function appendResult(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                    </div>`
      result_list.append(html);
    }
    function appendErrMsgToHTML(msg){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${msg}</p>
                  </div>`
      result_list.append(html);
    }
    function appendUser(user){
      var html =`<div class="chat-group-user clearfix js-chat-member" id="${user.userId}">
                    <input name="group[user_ids][]" value="${user.userId}" class="group[user_ids][]" id="grou_user_ids" type="hidden" >
                      <p class="chat-group-user__name">${user.userName}</p>
                      <a class="chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
      return html;
    }
    $('#user-search-field').on('keyup',function(){
      var href = '/users';
      var input = $.trim($("#user-search-field").val());
      var user_ids = [];
      var userList = $('.js-add-user').children('div');
      for(var i=0;i < userList.length;i++){
        user_ids.push(userList[i].id);
      }
      $.ajax({
        url:          href,
        type:         "GET",
        data:         {search: input,user_ids: user_ids},
        dataType:     'json',
      })
      .done(function(users){
        $(".user-search-result").empty();
        if(users.length !== 0){
          users.forEach(function(user){
            appendResult(user);
          });
        }
        else{
          appendErrMsgToHTML("一致するユーザーが見つかりません")
        }
      })
      .fail(function(){
        alert('ユーザ検索に失敗しました');
      })
    });
    $('.user-search-result').on('click','.chat-group-user__btn--add',function(){
      var user = $(this).data();
      var html = appendUser(user);
      $('.js-add-user').append(html);
      $('.user-search-result').empty();
      $('#user-search-field').val('');
    });
    $('.js-add-user').on('click','.chat-group-user__btn--remove',function(){
      var id = $(this).parent('div');
      $(id).remove();
    });
  });
});