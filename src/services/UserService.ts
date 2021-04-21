import { getRepository, Repository } from 'typeorm'

import { User } from '../entities/User'

class UserService {
  private usersRepository: Repository<User>

  constructor () {
    this.usersRepository = getRepository(User)
  }

  async store (email: string): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findOne({
      where: { email }
    })

    if (userAlreadyExists) {
      return userAlreadyExists
    }

    const user = this.usersRepository.create({ email })

    await this.usersRepository.save(user)

    return user
  }
}

export { UserService }
