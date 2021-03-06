import { io } from '../app'
import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'
import { UsersService } from '../services/UsersService'

interface IParams {
  text: string
  email: string
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()

  socket.on('client_first_access', async (params: IParams) => {
    const { text, email } = params

    const user = await usersService.findOrCreate(email)

    const connection = await connectionsService.findByUserId(user.id)

    const data = connection || {
      socket_id: socket.id,
      user_id: user.id
    }

    await connectionsService.create(data)

    await messagesService.create({
      text,
      user_id: user.id
    })

    const allMessages = await messagesService.listByUser(user.id)

    socket.emit('client_list_all_messages', allMessages)

    const allUsers = await connectionsService.findAllWithoutAdmin()

    io.emit('admin_list_all_users', allUsers)
  })

  socket.on('client_send_to_message', async ({ text, socket_admin_id }) => {
    const { user_id, user } = await connectionsService.findBySocketId(socket.id)

    const message = await messagesService.create({
      text,
      user_id
    })

    io.to(socket_admin_id).emit('admin-receive-message', {
      message,
      user_id,
      email: user.email
    })
  })
})
