import { getRepository } from 'typeorm'

import { Setting } from '../entities/Setting'

interface ICreateSettings {
  username: string
  chat: boolean
}

class SettingsService {
  async store ({ chat, username }: ICreateSettings): Promise<Setting> {
    const settingsRepository = getRepository(Setting)

    const userAlreadyExists = await settingsRepository.findOne({
      where: { username }
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const setting = settingsRepository.create({
      username,
      chat
    })

    await settingsRepository.save(setting)

    return setting
  }
}

export { SettingsService }
