import User from '../models/User'
import bcrypt from 'bcryptjs'
import { errorMessage } from '../utils/statusMessage'

export class AuthController {
	static async login(req, res) {
		res.render('auth/login')
	}

	static async register(req, res) {
		res.render('auth/register')
	}

	static async registerPost(req, res) {
		const { name, email, password, confirmPassword } = req.body

		const checkIfUserExists = await User.findOne({ where: { email } })

		if (checkIfUserExists) {
			req.flash('error', 'Email já cadastrado')
			res.render('auth/register')
			return
		}

		if (password !== confirmPassword) {
			req.flash('error', 'As senhas não conferem, tente novamente')
			res.render('auth/register')
			return
		}

		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(password, salt)

		const user = {
			name,
			email,
			password: hashedPassword
		}

		try {
			const createdUser = await User.create(user)
			req.session.userId = createdUser.id
			req.flash('success', 'Usuário Cadastrado com sucesso!')
			req.session.save(() => {
				res.redirect('/')
			})
		} catch (error) {
			errorMessage(error)
		}
	}

	static async logout(req, res) {
		req.session.destroy()
		res.redirect('/auth/login')
	}
}

export default AuthController
