import { io, Socket } from 'socket.io-client';
import { createPeerConnection, getPeerConnection } from './peer-connection';

let connectedUsers: string[] = [];

let socket: Socket;

let onConnect: (socket: Socket) => void;
let onMsgRecieve: (data: any) => void;
let onUserConnect: (data: any) => void;
let onUserDisconnect: () => void;

interface ConnectionCallbacks {
  onConnect?: (socket: Socket) => void;
  onMsgRecieve?: (data: any) => void;
}

export const connectToSocket = (cbs: ConnectionCallbacks): Promise<Socket> => {
  socket = io();

  if (cbs?.onConnect) {
    onConnect = cbs.onConnect;
  }

  if (cbs?.onMsgRecieve) {
    onMsgRecieve = cbs.onMsgRecieve;
  }

  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      if (socket.connected) {
        console.log('Socket connected');
        resolve(socket);

        if (onConnect) {
          onConnect(socket);
        }
      }
    });

    socket.on('message', data => {
      console.log('Recieved msg: ', data);

      if (onMsgRecieve) {
        onMsgRecieve(data);
      }
    });

    socket.on('user_connected', data => {
      console.log('User connected ', data);
      connectedUsers = [data];
      onUserConnect(data);
    });

    socket.on('user_disconnected', data => {
      console.log('User disconnected ', data);
      connectedUsers = [];
      onUserDisconnect();
    });

    socket.on('all_users', data => {
      console.log('All users: ', data);
      connectedUsers = [...data];
      onUserConnect && onUserConnect(data.filter(d => d != socket.id));
    });

    socket.on('connection-offer', data => {
      console.log('connection-offer received', data);
      const pConn = createPeerConnection();

      const desc = new RTCSessionDescription(data.sdp);

      pConn.conn.setRemoteDescription(desc);
      pConn.conn.addEventListener('datachannel', evt => {
        console.log('Recieve data channel: ', evt);

        const receiveChannel = evt.channel;
        receiveChannel.onmessage = data => {
          console.log('onmessage data channel: ', data);
        };
        receiveChannel.open = () => {
          console.log('open data channel: ', data);
        };
        receiveChannel.onclose = () => {
          console.log('onclose data channel: ');
        };
      });
    });

    socket.on('new-ice-candidate', data => {
      console.log('recieved new ice candidate: ', data);
      getPeerConnection().conn.addIceCandidate(data.candidate);
    });
  });
};

export const getSocket = () => socket;

export const registerOnMsgRecieve = (cb: (data: any) => void) => {
  onMsgRecieve = cb;
};

export const registerOnUserDisconnect = (cb: () => any) => {
  onUserDisconnect = cb;
};

export const registerOnUserConnect = (cb: (data: any) => void) => {
  onUserConnect = cb;
};

export const getConnectedUsers = () => connectedUsers.filter(usr => socket.id != usr);