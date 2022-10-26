export interface InworldSendMessageProps {
  message: string
  playerName: string
  socket: any
}

export interface InworldResponse {
  success: boolean
  text: string
}
