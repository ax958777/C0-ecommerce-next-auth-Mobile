import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
      cors: {
          origin: '*',
          methods: ['GET', 'POST']
      }
  });

  io.on('connection', (socket) => {
    const roomId = socket.handshake.query.roomId

    socket.join(roomId)
    console.log('socket joind',socket.id,roomId);
    socket.broadcast.to(roomId).emit('user-joined', {
      userId: socket.id
    })

    socket.on('offer', (data) => {
      console.log('offer',data);
      socket.to(data.target).emit('offer', {
        caller: data.caller,
        sdp: data.sdp
      })
    })

    socket.on('answer', (data) => {
      socket.to(data.target).emit('answer', {
        caller: data.caller,
        sdp: data.sdp
      })
    })

    socket.on('ice-candidate', (data) => {
      socket.to(data.target).emit('ice-candidate', {
        candidate: data.candidate,
        from: socket.id
      })
    })

    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-left', {
        userId: socket.id
      })
    })
  })


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});