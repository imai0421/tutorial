import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private hubName = "SampleHub";

  connect(){
    let connection = $.hubConnection();
    var connectionHub = connection.createHubProxy(this.hubName);
    
    connectionHub.on('hello', function (text) {
      console.log("called hello");
      $('#notifications').append(`<li>${text}</li>`);
    });

    connectionHub.on('notification', function (text) {
      console.log("called notification");
      $('#notifications').append(`<li>${text}</li>`);
    });

    connectionHub.on('receive', function (text) {
      console.log("called receive");
      $('#notifications').append(`<li>${text}</li>`);
    });

    $('#notifications').on("click", function(){
      if ($('#chat-box').val()){
        connectionHub.invoke("send",$('#chat-box').val()).catch(err => console.log(err));
      }
    });

    connection.start().then(() => {
      console.log("connection started");
      $("#connection-status").text("connected");
      connectionHub.invoke("hello","ユーザ").catch(err => console.log(err));

    }).catch(err => console.log(err));

    connection.disconnected(function() {
      console.log("disconnected");
      $("#connection-status").text("unconnect");
      setTimeout(function() {
        connection.start().then(() => {
          console.log("connection restarted");
          $("#connection-status").text("connected");
        }).catch(err => console.log(err));
      }, 10000); // Restart connection after 10 seconds.
    });
    
    // あとでよく調べる
    $.connection.hub = connection;
  }

  send() {
    if ($('#chat-name').val() && $('#chat-box').val()){
      let connectionHub = $.connection.hub.createHubProxy("echo");
      connectionHub.invoke("send", $('#chat-name').val(), $('#chat-box').val()).catch(err => console.log(err));
    }
  }

  clear() {
    $('#notifications').children().remove();
  }
}
