import { Router } from 'express'

import { MessagesController } from '../controllers/MessagesController'

const messagesRoutes = Router()
const messagesController = new MessagesController()

messagesRoutes.get('/:user_id', messagesController.index)
messagesRoutes.post('/', messagesController.store)

export { messagesRoutes }
