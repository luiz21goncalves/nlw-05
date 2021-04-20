import { Router } from 'express'

import { settingsRoutes } from './settings.routes'

const routes = Router()

routes.use('/settings', settingsRoutes)

export { routes }
