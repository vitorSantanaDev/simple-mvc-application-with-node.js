import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

import { errorMessage, successMessage } from '../utils/statusMessage.mjs'

dotenv.config()

const connection = new Sequelize(
	'toughts',
	process.env.USER_DATABASE,
	process.env.USER_DATABASE_PASSWORD,
	{
		host: process.env.HOST,
		dialect: process.env.DIALECT
	}
)

try {
	connection.authenticate()
	successMessage('successful bank connection')
} catch (error) {
	errorMessage(error)
}

export default connection
