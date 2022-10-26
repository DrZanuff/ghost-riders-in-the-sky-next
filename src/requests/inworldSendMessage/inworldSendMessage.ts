import {
  InworldClient,
  InworldPacket,
  Capabilities,
  ServiceError,
  status,
} from "@inworld/nodejs-sdk"
import type {
  InworldSendMessageProps,
  InworldResponse,
} from "./inworldSendMessage.types"

export async function inworldSendMessage({
  message,
  playerName,
  socket,
}: InworldSendMessageProps): Promise<InworldResponse> {
  const capabilities: Capabilities = { audio: false, emotions: false }

  const client = new InworldClient()
    .setApiKey({
      key: String(process.env.INWORLD_KEY),
      secret: String(process.env.INWORLD_SECRET),
    })
    .setUser({ fullName: playerName })
    .setConfiguration({ capabilities })
    .setScene(
      "workspaces/default-sgo7hwcynvcfxrgcytqwfg/characters/the_caterpillar"
    )
    .setOnError((err: ServiceError) => {
      switch (err.code) {
        // Cancelled by server due timeout inactivity.
        case status.ABORTED:
        // Cancelled by client.
        case status.CANCELLED:
          console.log(" Cancelled by server due timeout inactivity")
          break
        default:
          console.error(err)
          break
      }
    })
    .setOnMessage(async (packet: InworldPacket) => {
      console.log("DBG:", { packet })
      if (packet.isText()) {
        if (packet.text.final) {
          connection.close()

          socket.broadcast.emit("server-message-received", packet.text.text)
        }
      } else {
        connection.close()
      }
    })

  const connection = client.build()
  await connection.sendText(message)

  return {
    success: true,
    text: "sucesso",
  }
}
