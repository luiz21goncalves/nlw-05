import { Request, Response } from 'express'

import { UserService } from '../services/UserService'

class UsersController {
  async store (request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const usersService = new UserService()

    try {
      const user = await usersService.store(email)

      return response.status(201).json(user)
    } catch (err) {
      return response.status(400).json({
        status: 400,
        message: err.message
      })
    }
  }
}

export { UsersController }
