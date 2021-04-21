import { Request, Response } from 'express'

import { SettingsService } from '../services/SettingsServices'

class SettingsController {
  async store (request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body

    const settingsService = new SettingsService()

    try {
      const setting = await settingsService.store({
        username,
        chat
      })

      return response.status(201).json(setting)
    } catch (err) {
      return response.status(400).json({
        status: 400,
        message: err.message
      })
    }
  }
}

export { SettingsController }
