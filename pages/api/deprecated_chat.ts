// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next"
// import { inworldSendMessage } from "../../src/requests/inworldSendMessage"
// import { Server } from "socket.io"

// export type Data = {
//   text: string
//   response: boolean
//   success: boolean
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { message, name } = req.query

//   if (!message || !name) {
//     res.status(500).json({
//       text: "Missing parameters in the request (message & name)",
//       response: false,
//       success: false,
//     })
//   }

//   const response = await inworldSendMessage({
//     message: String(message),
//     playerName: String(name),
//   })

//   const responseMessage = {
//     text: response.text,
//     response: true,
//     success: response.success,
//   }

//   console.log("DBG: handler", { responseMessage })

//   res.status(200).json(responseMessage)
// }

export default function Chat(req: any, res: any) {
  res.status(200).json("ok")
}
