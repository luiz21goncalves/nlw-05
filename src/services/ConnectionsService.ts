import { Repository, getRepository } from 'typeorm'

import { Connection } from '../entities/Connetion'

interface ICreateConnection {
  id?: string
  admin_id?: string
  user_id: string
  socket_id: string
}

interface IUpdateConnection {
  user_id: string
  admin_id: string
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>

  constructor () {
    this.connectionsRepository = getRepository(Connection)
  }

  async create ({ socket_id, user_id, admin_id, id }: ICreateConnection): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      id,
      user_id,
      admin_id,
      socket_id
    })

    await this.connectionsRepository.save(connection)

    return connection
  }

  async findByUserId (user_id: string): Promise<Connection> {
    return this.connectionsRepository.findOne({
      where: { user_id }
    })
  }

  async findBySocketId (socket_id: string): Promise<Connection> {
    return this.connectionsRepository.findOne({
      where: { socket_id },
      relations: ['user']
    })
  }

  async findAllWithoutAdmin ():Promise<Connection[]> {
    return this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user']
    })
  }

  async update ({ admin_id, user_id }:IUpdateConnection): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({
      where: { user_id }
    })
    Object.assign(connection, { admin_id })

    return this.connectionsRepository.save(connection)
  }
}

export { ConnectionsService }
