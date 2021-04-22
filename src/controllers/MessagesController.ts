import { Request, Response } from 'express'

import { MessagesService } from '../services/MessagesService'

class MessagesController {
  async index (request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    try {
      const messagesService = new MessagesService()

      const messages = await messagesService.listByUser(user_id)

      return response.json(messages)
    } catch (err) {
      return response.json({
        message: err.message
      })
    }
  }

  async store (request: Request, response: Response): Promise<Response> {
    const { text, user_id, admin_id } = request.body

    const messagesService = new MessagesService()

    const message = await messagesService.create({
      text,
      user_id,
      admin_id
    })

    return response.json(message)
  }
}

export { MessagesController }
