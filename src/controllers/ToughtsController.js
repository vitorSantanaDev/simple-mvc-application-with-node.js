import Tought from '../models/Toughts'
import User from '../models/User'
import { errorMessage } from '../utils/statusMessage'

export class ToughtsController {
	static async showToughts(req, res) {
		res.render('toughts/home')
	}

	static async dashboard(req, res) {
		const { userId } = req.session

		const user = await User.findOne({
			where: { id: userId },
			include: Tought,
			plain: true
		})

		const toughts = user.Toughts.map((result) => result.dataValues)

		if (!user) {
			res.redirect('/auth/login')
		}

		res.render('toughts/dashboard', { toughts })
	}

	static async createTought(req, res) {
		res.render('toughts/create')
	}

	static async createToughtSave(req, res) {
		try {
			const { title } = req.body
			const { userId } = req.session
			const tought = { title, UserId: userId }

			await Tought.create(tought)
			req.flash('success', 'Pensamento criado com sucesso!')

			req.session.save(() => {
				res.render('toughts/dashboard')
			})
		} catch (error) {
			errorMessage(error)
		}
	}
}

export default ToughtsController
