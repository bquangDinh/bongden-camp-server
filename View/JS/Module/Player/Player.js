"use strict";
module.exports = class Player{
  constructor(){
    this.currentScore = 0;
    this.playerName = "Unknown";
    this.status = "Offline";
    this.identify = 1;
    this.messContent = "Unknown";

    this.PROPERTIES_NAME = {
      SCORE: 'SCO',
      NAME:'NAM',
      STATUS:'STA',
      ID:'_ID',
      MESS:'MES',
      ALARM:'ARL',
      SERVERMESS:'SES',
      DESTROY:'DES'
    }

    /*Init Events*/
    var event = require('events');
    this.eventEmitter = new event.EventEmitter();
  }

  /*getter and setter*/
  get ID(){
    return this.identify;
  }

  set ID(value){
    this.identify = value;
  }

  get Score(){
    return this.currentScore;
  }

  set Score(value){
    this.currentScore = value;
    this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.SCORE + value);
    this.eventEmitter.emit('send-abroad',this.PROPERTIES_NAME.SCORE + value);
  }

  get Name(){
    return this.playerName;
  }

  set Name(value){
    this.playerName = value;
    this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.NAME + value);
  }

  get Status(){
    return this.status;
  }

  set Status(value){
    this.status = value;
  }

  get Mess(){
    return this.messContent;
  }

  set Mess(value){
    this.messContent = value;
    this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.MESS + value);
  }

  /*Methods*/
  CopyData(target){
    this.Score = target.currentScore;
    this.Name = target.playerName;
    this.ID = target.identify;
    this.Status = target.status;
    this.Mess = target.messContent;
  }

  SendMessageFromServer(mess){
    this.eventEmitter.emit('send-abroad',this.PROPERTIES_NAME.SERVERMESS + mess);
  }

  Destroy(){
    this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.DESTROY);
  }

  Alarm(){
    this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.ALARM);
  }
}
