export async function checkAuth(req, res, next) {
	const userId = req.session.userId
	if (!userId) {
		res.redirect('/auth/login')
	}
	next()
}
