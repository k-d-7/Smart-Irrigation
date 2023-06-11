import {Server, Socket} from 'socket.io';

interface ServerToClientEvents {
  noArg: () => void;
  subscribe: (callbak: () => void) => void;
  unsubscribe: (callbak: () => void) => void;
  message: (message: string, callback: () => void) => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  subscribe: (channel: string) => void;
  unsubscribe: (channel: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const ioInstance = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true,
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
    cookie: false,
    allowUpgrades: true,
    perMessageDeflate: true,
    httpCompression: true,
    maxHttpBufferSize: 1e7
});

ioInstance.on('connection', (socket) => {
    console.log('socket client connected');
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.on('subscribe', (channel) => {
        socket.join(channel);
    });

    socket.on('unsubscribe', (channel) => {
        socket.leave(channel);
    });

});


export default ioInstance;