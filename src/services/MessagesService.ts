import { getRepository, Repository } from 'typeorm'

import { Message } from '../entities/Message'

interface ICreateMessage {
  user_id: string
  admin_id?: string;
  text: string
}

class MessagesService {
  private messagesRepository: Repository<Message>

  constructor () {
    this.messagesRepository = getRepository(Message)
  }

  async listByUser (user_id: string): Promise<Message[]> {
    const messages = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user']
    })

    return messages
  }

  async create ({ user_id, admin_id, text }: ICreateMessage): Promise<Message> {
    const message = this.messagesRepository.create({
      user_id,
      admin_id,
      text
    })

    await this.messagesRepository.save(message)

    return message
  }
}

export { MessagesService }
