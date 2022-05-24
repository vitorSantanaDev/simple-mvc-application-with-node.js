import express from 'express'
import AuthController from '../controllers/AuthController'

const authRouter = express.Router()

authRouter.get('/login', AuthController.login)
authRouter.get('/register', AuthController.register)
authRouter.get('/logout', AuthController.logout)

authRouter.post('/register', AuthController.registerPost)

export default authRouter
