"use strict";
module.exports = class PlayerMainUI{
  constructor(player){
    this.player = player;
  }

  InitUI(){
    var $ = require('jquery');

    let col = document.createElement("div");
    $(col).addClass("col-3");

    let user_container = document.createElement("div");
    $(user_container).addClass("user-container w-100 mt-2 shadow-hover animated jackInTheBox");

    let name_box = document.createElement("div");
    $(name_box).addClass("w-100 text-center mt-2 user-name");

    let score_container = document.createElement("div");
    $(score_container).addClass("score-container w-100 mt-2 d-flex justify-content-around align-items-center");

    let minus_btn = document.createElement("i");
    $(minus_btn).addClass("fas fa-minus mr-3 score-btn minus-score-btn");

    let plus_btn = document.createElement("i");
    $(plus_btn).addClass("fas fa-plus ml-3 score-btn plus-score-btn");

    let score_box = document.createElement("span");
    $(score_box).addClass("score-value");

    $(score_container).append(plus_btn);
    $(score_container).append(score_box);
    $(score_container).append(minus_btn);

    let user_text_container = document.createElement("div");
    $(user_text_container).addClass("user-text-container mt-2 mr-3 ml-3");

    let mess_box = document.createElement("div");
    $(mess_box).addClass("user-text-inner mt-2 mr-2 ml-2 mb-2 w-75");

    $(user_text_container).append(mess_box);

    let host_input = document.createElement("div");
    $(host_input).addClass("host-input mt-2 mr-3 ml-3");

    let send_box = document.createElement("input");
    $(send_box).addClass("host-input-txt");
    $(send_box).attr("type","text");

    let send_btn = document.createElement("button");
    $(send_btn).addClass("send-text-btn");
    $(send_btn).attr("type","button");

    let send_btn_icon = document.createElement("i");
    $(send_btn_icon).addClass("fas fa-paper-plane");

    $(send_btn).append(send_btn_icon);

    $(host_input).append(send_box);
    $(host_input).append(send_btn);

    $(user_container).append(name_box);
    $(user_container).append(score_container);
    $(user_container).append(user_text_container);
    $(user_container).append(host_input);
    $(col).append(user_container);

    let current_user_box = $("#users-list > .col-3").length;
    console.log("CRR: " + current_user_box);
    if(current_user_box == 1){
      $("#users-list").prepend(col);
    }else{
      $("#users-list .col-3:eq(" + (current_user_box - 2) + ")").after(col);
    }

    this.plus_btn = plus_btn;
    this.minus_btn = minus_btn;
    this.score_box = score_box;
    this.name_box = name_box;
    this.mess_box = mess_box;
    this.player_background = user_container;
    this.send_box = send_box;
    this.send_btn = send_btn;
    this.player_container = col;
  }

  InitEvents(){
    var that = this;
    this.plus_btn.addEventListener('click',function(e){
      that.player.Score += 5;
      that.score_box.innerHTML = that.player.Score;
    });

    this.minus_btn.addEventListener('click',function(e){
      that.player.Score -= 5;
      that.score_box.innerHTML = that.player.Score;
    });

    this.send_btn.addEventListener('click',function(e){
      let message = $(that.send_box).val();
      that.player.SendMessageFromServer(message);
    });

    this.mess_box.addEventListener('click',function(e){
      const Swal = require('sweetalert2');
      Swal.fire({
        title:'Tin nhắn',
        text: that.player.Mess
      });
    });
  }

  InitListener(){
    var that = this;
    this.player.eventEmitter.on('ui-update',function(data){
      var propertiesName = data.substring(0,3);
      var value = data.substring(3,data.length);

      switch (propertiesName) {
        case that.player.PROPERTIES_NAME.NAME:
          that.name_box.innerHTML = value;
          break;

        case that.player.PROPERTIES_NAME.MESS:
          that.mess_box.innerHTML = value;
          break;

        case that.player.PROPERTIES_NAME.SCORE:
          that.score_box.innerHTML = value;
          break;

        case that.player.PROPERTIES_NAME.DESTROY:
          $(that.player_container).remove();
          break;
      }
    });
  }
}
