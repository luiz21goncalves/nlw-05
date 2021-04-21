import { Router } from 'express'

import { settingsRoutes } from './settings.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/settings', settingsRoutes)

export { routes }
