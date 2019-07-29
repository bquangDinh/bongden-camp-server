"use strict";

/*Init Server*/
const serverCommunicator_MD = require('../JS/Module/Server/ServerCommunicator.js');
var serverCommunicator = new serverCommunicator_MD();

const serverModule = require("../JS/Module/Server/Server");
var server = null;

/*Init Player Manager*/
const playerManager_MD = require('../JS/Module/Player/PlayerManager');
var playerManager = new playerManager_MD();

/*PlayerManager is a communicator, and they will connect each other*/
if(typeof(playerManager) !== 'undefined'){
	serverCommunicator.Add(playerManager);
}

/*Methods*/
function SwitchServerStatus(status){
  if(status == "connected"){
    $('.status-icon').addClass("online");
    $('.server-status').addClass("online");
    $("#status").text("Listenning...");
  }

  if(status == "unconnected"){
    $('.status-icon').removeClass("online");
    $('.server-status').removeClass("online");
    $("#status").text("Unconnected");
  }
}

/*Events*/
var addinuse = 0;

$("#start-listen-btn").on('click',function(e){
  let ip = $("#inputIP").val();
  let gate = $("#inputGate").val();
  console.log("IP: " + ip + " | gate: " + gate);
  server = new serverModule(ip,gate,serverCommunicator);
  let server_INS = server.InitServer();
  SwitchServerStatus("connected");
  server_INS.on('error',(e) => {
    if(e.code === 'EADDRINUSE'){
			const Swal = require('sweetalert2');
			if(addinuse == 0){
				Swal.fire({
					type:'error',
					title:'Bấm nhiều lỗi á !',
					text:'Lỗi bây giờ đó mấy đứa. Làm nhanh nên chưa test kỹ. Đừng có bấm zô :333'
				});
				addinuse++;
				return;
			}
			if(addinuse == 1){
				Swal.fire({
					type:'error',
					title:'Lại bấm là sao ( -.-)',
					text:'Lỗi phát anh không biết mô nghe :)'
				});
				addinuse++;
				return;
			}

			if(addinuse){
				Swal.fire({
					type:'error',
					title:'Am I a joke to you ? :)',
					text:'((:'
				});
				addinuse = 0;
				return;
			}
		}
  });
});

$("#stop-listen-btn").on('click',function(e){
	const Swal = require('sweetalert2');
	Swal.fire({
		type:'warning',
		title:'Tính năng đang phát triển',
		text:'Hạn cuối hoàn thành: Anh không biết'
	});
});
