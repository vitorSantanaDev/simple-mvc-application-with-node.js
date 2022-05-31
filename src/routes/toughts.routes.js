import express from 'express'
import ToughtsController from '../controllers/ToughtsController'
import { checkAuth } from '../middlewares/auth'

const toughtsRouter = express.Router()

toughtsRouter.get('/', ToughtsController.showToughts)
toughtsRouter.get('/dashboard', checkAuth, ToughtsController.dashboard)
toughtsRouter.get('/add', checkAuth, ToughtsController.createTought)
toughtsRouter.get('/edit/:id', checkAuth, ToughtsController.updateTought)

toughtsRouter.post('/edit', checkAuth, ToughtsController.updateToughtSave)
toughtsRouter.post('/add', checkAuth, ToughtsController.createToughtSave)
toughtsRouter.post('/remove', checkAuth, ToughtsController.removeTought)

export default toughtsRouter
