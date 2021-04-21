import { Router } from 'express'

import { messagesRoutes } from './messages.routes'
import { settingsRoutes } from './settings.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/settings', settingsRoutes)
routes.use('/users', usersRoutes)
routes.use('/messages', messagesRoutes)

export { routes }
