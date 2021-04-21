import { getRepository, Repository } from 'typeorm'

import { Setting } from '../entities/Setting'

interface ICreateSettings {
  username: string
  chat: boolean
}

class SettingsService {
  private settingsRepository: Repository<Setting>

  constructor () {
    this.settingsRepository = getRepository(Setting)
  }

  async store ({ chat, username }: ICreateSettings): Promise<Setting> {
    const userAlreadyExists = await this.settingsRepository.findOne({
      where: { username }
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const setting = this.settingsRepository.create({
      username,
      chat
    })

    await this.settingsRepository.save(setting)

    return setting
  }
}

export { SettingsService }
