import { Router } from 'express'

import { SettingsController } from '../controllers/SettingsController'

const settingsRoutes = Router()
const settingsController = new SettingsController()

settingsRoutes.post('/', settingsController.store)
settingsRoutes.get('/:username', settingsController.show)
settingsRoutes.put('/:username', settingsController.update)

export { settingsRoutes }
