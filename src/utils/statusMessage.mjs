import chalk from 'chalk'

export function errorMessage(error) {
	throw new Error(
		chalk.bgRed.black(`⛔ Ocorreu o seguinte error: ${error.message}`)
	)
}

export function successMessage(message) {
	console.log(chalk.bgGreen.black(`✨ ${message}`))
}
