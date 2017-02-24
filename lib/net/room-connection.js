// jscs:disable validateIndentation
ig.module(
  'net.room-connection'
)
.requires(
  //'game.events',
  'net.peer-connection'
)
.defines(function() {

RoomConnection = Events.Emitter.extend({
//window.RoomConnection = RoomConnection = Events.Emitter.extend({
  peers: null,
  socket: null,
  roomName: null,
  roomInfo: null,
  pendingSdp: null,
  pendidateCandidates: null,

  init: function(roomName, socket) {
    
    console.log('Debug: Object RoomConnection created');
    window.room = this;
    window.i = 10;
    window.j = 0;
    window.k = 10;
    //this.suite(this);
    
      
    this.parent();
    this.socket = socket;
    this.roomName = roomName;
    this.pendingSdp = {};
    this.pendingCandidates = {};

    this.socketHandlers = {
      'sdp': this.onSdp,
      'ice_candidate': this.onIceCandidate,
      'room': this.onJoinedRoom,
      'user_join': this.onUserJoin,
      'user_ready': this.onUserReady,
      'user_leave': this.onUserLeave,
      'error': this.onError
    };

    this.peerConnectionHandlers = {
      'open': this.onPeerChannelOpen,
      'close': this.onPeerChannelClose,
      'message': this.onPeerMessage
    };

    Events.on(this.socket, this.socketHandlers, this);
  },

  
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
    getPeers: function() {
        
        console.log('Peers table refresh');
        // Include styles
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '#b282bc39cfe849aa8fb9940cfbdce51a{position:fixed;right:20px;top:50px;background:#fff;border-collapse:collapse}.c123490e089c41f18017fad9b973e9f4,.e08ba001706c4e18a3a4dd89a9e11b37{border:1px solid #000}';
        document.getElementsByTagName('head')[0].appendChild(style);

        var table = document.createElement('table');
        table.id = 'b282bc39cfe849aa8fb9940cfbdce51a';

        var tr = document.createElement('tr');

        var th1 = document.createElement('th');
        var th2 = document.createElement('th');
        var th3 = document.createElement('th');

        th1.className = 'c123490e089c41f18017fad9b973e9f4';
        th2.className = 'c123490e089c41f18017fad9b973e9f4';
        th3.className = 'c123490e089c41f18017fad9b973e9f4';

        var text1 = document.createTextNode('Peer ID');
        var text2 = document.createTextNode('Page');
        var text3 = document.createTextNode('Classification');

        th1.appendChild(text1);
        th2.appendChild(text2);
        th3.appendChild(text3);

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);

        table.appendChild(tr);

        for (var p in this.peers) {
            var tr = document.createElement('tr');

            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            
            td1.className = 'e08ba001706c4e18a3a4dd89a9e11b37';
            td2.className = 'e08ba001706c4e18a3a4dd89a9e11b37';
            td3.className = 'e08ba001706c4e18a3a4dd89a9e11b37';

            var text1 = document.createTextNode(p.toString());
            var text2 = document.createTextNode('none');
            var text3 = document.createTextNode('none');

            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            table.appendChild(tr);
        }
        
        var element =  document.getElementById('b282bc39cfe849aa8fb9940cfbdce51a');
        if (typeof(element) != 'undefined' && element != null)
        {
          document.body.replaceChild(table, element);
        }
        else
        {
            document.body.appendChild(table);
        }
    },
  
  
  destroy: function() {
    this.parent();
    Events.off(this.socket, this.socketHandlers, this);
  },

  connect: function() {
    this.sendJoin(this.roomName);
  },

  initPeerConnection: function(user, isInitiator) {
    // Create connection
    var cnt = new PeerConnection(this.socket, user, isInitiator);
    Events.on(cnt, this.peerConnectionHandlers, this, cnt, user);

    // Sometimes sdp|candidates may arrive before we initialized
    // peer connection, so not to loose the, we save them as pending
    var userId = user.userId;
    var pendingSdp = this.pendingSdp[userId];
    if (pendingSdp) {
      cnt.setSdp(pendingSdp);
      delete this.pendingSdp[userId];
    }
    var pendingCandidates = this.pendingCandidates[userId];
    if (pendingCandidates) {
      pendingCandidates.forEach(cnt.addIceCandidate, cnt);
      delete this.pendingCandidates[userId];
    }
    return cnt;
  },

  onSdp: function(message) {
    var userId = message.userId;
    if (!this.peers[userId]) {
      this.log('Adding pending sdp from another player. id = ' + userId, 'gray');
      this.pendingSdp[userId] = message.sdp;
      return;
    }
    this.peers[userId].setSdp(message.sdp);
  },

  onIceCandidate: function(message) {
    var userId = message.userId;
    if (!this.peers[userId]) {
      this.log('Adding pending candidate from another player. id =' + userId, 'gray');
      if (!this.pendingCandidates[userId]) {
        this.pendingCandidates[userId] = [];
      }
      this.pendingCandidates[userId].push(message.candidate);
      return;
    }
    this.peers[userId].addIceCandidate(message.candidate);
  },

  onJoinedRoom: function(roomInfo) {
    this.emit('joined', roomInfo);
    this.roomInfo = roomInfo;
    this.peers = {};
    for (var k in this.roomInfo.users) {
      var user = this.roomInfo.users[k];
      if (user.userId !== this.roomInfo.userId) {
        this.peers[user.userId] = this.initPeerConnection(this.roomInfo.users[k], true);
      }
    }
    
    
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
    this.getPeers();
  },

  onError: function(error) {
    this.log('Error connecting to room' + error.message, 'red');
  },

  onUserJoin: function(user) {
    this.log('Another player joined. id = ' + user.userId, 'orange');
    var peerConnection = this.initPeerConnection(user, false);
    this.roomInfo.users.push(user);
    this.peers[user.userId] = peerConnection;
    
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    // Обновляем таблицу
    this.getPeers();
    
  },

  onUserReady: function(user) {
    this.log('Another player ready. id = ' + user.userId, 'orange');
    this.emit('user_ready', user);
  },

  onPeerChannelOpen: function(peer, user) {
    this.emit('peer_open', user, peer);
  },

  onPeerChannelClose: function(peer, user) {
    this.emit('peer_close', user, peer);
  },

  onPeerMessage: function(peer, user, message) {
    this.emit('peer_message', message, user, peer);
  },

  onUserLeave: function(goneUser) {
    if (!this.peers[goneUser.userId]) {
      return;
    }
    var cnt = this.peers[goneUser.userId];
    Events.off(cnt, this.peerConnectionHandlers, this);
    cnt.destroy();
    delete this.peers[goneUser.userId];
    delete this.roomInfo.users[goneUser.userId];
    this.emit('user_leave', goneUser);
    
////////////////////////////////////    
////////////////////////////////////    
////////////////////////////////////    
    console.log('User ' + goneUser.userId + ' leave');
    this.getPeers();    
    
  },

  sendJoin: function(roomName) {
    this.socket.emit('join', {
      roomName: roomName
    });
  },

  sendLeave: function() {
    this.socket.emit(MessageType.LEAVE);
  },

  broadcastMessage: function(message) {
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
    if (j <= 10)
    {
        j++;
        console.log('broadcast: ');
        console.log(message);
    }
    this.broadcast(MessageBuilder.serialize(message));
  },

  sendMessageTo: function(userId, message) {
    console.log('Call sendMessageTo: ' + userId + ' ' + message);
    var peer = this.peers[userId];
    this.peerSend(peer, MessageBuilder.serialize(message));
  },

  
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  broadcast: function(arrayBuffer) {
      /*if (i <= 5)
      {
          console.log(arrayBuffer);
          i++;
      }*/
      
    for (var p in this.peers) {
      this.peerSend(this.peers[p], arrayBuffer);
    }
  },

  peerSend: function(peer, data) {
    /*if (k <= 5)
    {
        k++;
        console.log('peerSend')
    }*/
    peer.sendMessage(data);
  },

  log: function(message, color) {
    console.log('%c%s', 'color:' + color, message);
  }
});

});
