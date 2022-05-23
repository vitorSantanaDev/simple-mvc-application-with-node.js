import express from 'express'
import { engine } from 'express-handlebars'
import session from 'express-session'
import FileStore from 'session-file-store'
import flash from 'express-flash'
import dotenv from 'dotenv'

import path from 'path'
import os from 'os'

import connection from './database/connection.js'
import { errorMessage, successMessage } from './utils/statusMessage.js'

// eslint-disable-next-line no-unused-vars
import Toughts from './models/Toughts'
// eslint-disable-next-line no-unused-vars
import User from './models/User'

import toughtsRouter from './routes/toughts.routes'
import ToughtsController from './controllers/ToughtsController.js'
import authRouter from './routes/auth.routes.js'

dotenv.config()

const server = express()
const port = process.env.PORT || 4000
const fileStore = FileStore(session)
const sessionExpirationTime = 360000

// handlebars engine settings
const _dirname = path.resolve()

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', path.join(_dirname, 'src/views'))

// settings for express returns us jsons
server.use(
	express.urlencoded({
		extended: true
	})
)
server.use(express.json())

// public path
server.use(express.static('public'))

// Session users settings
server.use(
	session({
		name: process.env.SESSION_NAME,
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new fileStore({
			logFn: function () {},
			path: path.join(os.tmpdir(), 'sessions')
		}),
		cookie: {
			secure: false,
			maxAge: sessionExpirationTime,
			expires: new Date(Date.now() + sessionExpirationTime),
			httpOnly: true
		}
	})
)

// flash messages
server.use(flash())

// Set session
server.use((req, res, next) => {
	if (req.session.userId) {
		res.locals.session = req.session
	}
	next()
})

server.use('/toughts', toughtsRouter)
server.use('/auth', authRouter)
server.get('/', ToughtsController.showToughts)

// Connection of bank
connection
	.sync()
	// .sync({ force: true })
	.then(() => {
		server.listen(port, (error) => {
			if (error) errorMessage(error)
			successMessage(`Server is runnig in the port ${port}`)
		})
	})
	.catch((error) => {
		errorMessage(error)
	})
