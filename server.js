const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 3000;

const messages = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" },
];

// Middlewares
app.use(express.static("public"));

// Routes

// Server
httpServer.listen(PORT, () => console.log("server running on port ", PORT));

// Socket.io
io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);

  socket.on("new-message", (data) => {
    messages.push(data);
    // Se hace asi para que cualquier cliente conectado lo reciba
    io.sockets.emit("messages", messages);
  });
});
