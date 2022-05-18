import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import FileStore from 'session-file-store'
import flash from 'express-flash'
import dotenv from 'dotenv'

import path from 'path'
import os from 'os'

import connection from './database/connection.mjs'
import { errorMessage, successMessage } from './utils/statusMessage.mjs'

dotenv.config()

const server = express()
const port = process.env.PORT || 4000
const fileStore = FileStore(session)
const sessionExpirationTime = 360000

// handlebars engine settings
server.engine('handlebars', exphbs.engine())
server.set('view engine', 'handlebars')

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

// Connection of bank
connection
	.sync()
	.then(() => {
		server.listen(port, (error) => {
			if (error) errorMessage(error)
			successMessage(`Server is runnig in the port ${port}`)
		})
	})
	.catch((error) => {
		errorMessage(error)
	})
