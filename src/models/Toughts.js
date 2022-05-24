import { DataTypes } from 'sequelize'
import connection from '../database/connection'

import User from './User'

const Tought = connection.define('Tought', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		required: true
	}
})

Tought.belongsTo(User)
User.hasMany(Tought)

export default Tought
