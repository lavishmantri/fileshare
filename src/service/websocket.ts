import { io, Socket } from 'socket.io-client';

let socket: Socket;

let onConnect: (socket: Socket) => void;
let onMsgRecieve: (data: any) => void;

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
  });
};

export const getSocket = () => socket;

export const registerOnMsgRecieve = (cb: (data: any) => void) => {
  onMsgRecieve = cb;
};
