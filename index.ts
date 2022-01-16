import { Server } from "socket.io";
import Express from "express";
require("dotenv").config();
import { createServer } from "http";

const app = Express();
const port = process.env.port ?? "4000";
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});


io.on("connection", async (socket) => {
  console.log("user connected ", socket.id);
  //save socket.id to database when connected

  socket.on("Chat", (data: IChat) => {
    console.log(data);
    socket.broadcast.emit("Chat", data);
    //send to receiver id from response Chat : data 
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

interface IChat {
  message: string;
  user: string;
}
