import { Request, Response } from 'express'

import { SettingsService } from '../services/SettingsServices'

class SettingsController {
  async store (request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body

    const settingsService = new SettingsService()

    try {
      const setting = await settingsService.create({
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

  async show (request: Request, response: Response): Promise<Response> {
    const { username } = request.params

    const settingsService = new SettingsService()

    const setting = await settingsService.findByUsername(username)

    return response.json(setting)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { username } = request.params
    const { chat } = request.body

    const settingsService = new SettingsService()

    const setting = await settingsService.update({
      username,
      chat
    })

    return response.json(setting)
  }
}

export { SettingsController }
