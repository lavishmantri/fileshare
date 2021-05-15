import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToSocket = (): Promise<Socket> => {
  socket = io();

  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      if (socket.connected) {
        console.log('Socket connected');
        resolve(socket);
      }
    });
  });
};
