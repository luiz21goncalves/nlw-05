import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { Setting } from '../entities/Setting'

class SettingsController {
  async store (request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body

    const settingsRepository = getRepository(Setting)

    const setting = settingsRepository.create({
      username,
      chat
    })

    await settingsRepository.save(setting)

    return response.status(201).json(setting)
  }
}

export { SettingsController }
