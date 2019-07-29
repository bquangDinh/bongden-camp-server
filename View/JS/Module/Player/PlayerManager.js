"use strict";
module.exports = class PlayerManager{
  constructor(){
    this.players = [];
    this.sockets = [];
    this.actions = {
      MESS:'MESS'
    }
    this.playerCount = 0;
    this._type = 'adapter';
    this.signature = 'PLM';
    this.sendSignal = {
      SCORE:1,
      GOIY:2,
      ID:3
    }

    /*Init events*/
    var event = require('events');
    this.eventEmitter = new event.EventEmitter();

    this.SendDataToPlayer = function(data,socket){
      var elements = data.split('^');
      var player_id = elements[0];
      var action = elements[1];

      if(action == this.actions.MESS){
        let mess_content = elements[2];
        this.players[player_id].Mess = mess_content;
      }
    }
  }

  CreateNewPlayer(data,socket){
    var elements = data.split("^");
    console.log(elements);
    var player_name = elements[1];
    this.sockets.push(socket);
    let player_MD = require('../Player/Player.js');
    let player = new player_MD();
    player.Name = player_name;
    //generate a new ID
    player.ID = this.players.length;
    this.players.push(player);

    let player_UI_MD = require('../Player/PlayerMainUI.js');
    let player_UI = new player_UI_MD(player);
    player_UI.InitUI();
    player_UI.score_box.innerHTML = player.Score;
    player_UI.name_box.innerHTML = player.Name;

    player_UI.InitEvents();
    player_UI.InitListener();

    //send the ID back to client
    this.SendDataToServer(this.sendSignal.ID + "*" + player.ID,socket);
    return player;
  }

  InitPlayerEvents(player,socket){
    var that = this;
    player.eventEmitter.on('send-abroad',function(data){
      var propertiesName = data.substring(0,3);
      var value = data.substring(3,data.length);
      console.log();
      if(socket != null){
        switch (propertiesName) {
          case player.PROPERTIES_NAME.SCORE:
          that.SendDataToServer(that.sendSignal.SCORE + "*" + value,socket);
          break;

          case player.PROPERTIES_NAME.SERVERMESS:
          that.SendDataToServer(that.sendSignal.GOIY + "*" + value,socket);
          break;
        }
      }else{
        console.log("Cannot find the socket");
      }
    });
  }

  InitCloseEvent(player,socket){
    var that = this;
    socket.on('close',function(data){
      player.Destroy();
      that.players.splice(player.ID,1);
    });
  }

  GetDataFromClient(data,socket){
    if(data.includes('ASSI')){
      //first connecting
      let player = this.CreateNewPlayer(data,socket);
      this.InitPlayerEvents(player,socket);
      this.InitCloseEvent(player,socket);
    }else{
      this.SendDataToPlayer(data,socket);
    }
  }

  SendDataToServer(_data,socket){
    this.eventEmitter.emit("send-data-to-server",_data,socket);
  }
}
