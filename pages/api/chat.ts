import { Server } from "socket.io"
import { inworldSendMessage } from "../../src/requests/inworldSendMessage"

export type Data = {
  text: string
  response: boolean
  success: boolean
}

const Chat = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      socket.on("client-message-sent", (msg) => {
        const { message, name } = msg

        inworldSendMessage({
          message: String(message),
          playerName: String(name),
          socket,
        })
        // socket.broadcast.emit("update-input", msg)
      })
    })
  }
  res.end()
}

export default Chat
