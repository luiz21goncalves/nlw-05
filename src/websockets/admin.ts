import { io } from '../app'
import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'

io.on('connection', async socket => {
  const connectionsService = new ConnectionsService()
  const messagesService = new MessagesService()

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin()

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

  socket.on('admin_list_messages_by_user', async ({ user_id }, callback) => {
    const allMessages = await messagesService.listByUser(user_id)

    callback(allMessages)
  })

  socket.on('admin_send_message', async ({ user_id, text }) => {
    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id
    })

    const { socket_id } = await connectionsService.findByUserId(user_id)

    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id
    })
  })

  socket.on('admin_user_in_support', async ({ user_id }) => {
    await connectionsService.update({
      user_id,
      admin_id: socket.id
    })

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin()

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin)
    console.log('emit_admin_list_all_users', allConnectionsWithoutAdmin)
  })
})
