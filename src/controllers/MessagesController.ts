import { Request, Response } from 'express'

import { MessageService } from '../services/MessageService'

class MessagesController {
  async index (request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    try {
      const messageService = new MessageService()

      const messages = await messageService.listByUser(user_id)

      return response.json(messages)
    } catch (err) {
      return response.json({
        message: err.message
      })
    }
  }

  async store (request: Request, response: Response): Promise<Response> {
    const { text, user_id, admin_id } = request.body

    const messageService = new MessageService()

    const message = await messageService.store({
      text,
      user_id,
      admin_id
    })

    return response.json(message)
  }
}

export { MessagesController }
