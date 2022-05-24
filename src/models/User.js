import { DataTypes } from 'sequelize'
import connection from '../database/connection'

const User = connection.define('User', {
	name: {
		type: DataTypes.STRING,
		required: true
	},
	email: {
		type: DataTypes.STRING,
		required: true
	},
	password: {
		type: DataTypes.STRING,
		required: true
	}
})

export default User
