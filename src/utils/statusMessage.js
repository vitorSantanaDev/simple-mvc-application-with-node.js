export function errorMessage(error) {
	throw new Error(`⛔ Ocorreu o seguinte error: ${error.message}`)
}

export function successMessage(message) {
	console.log(`✨ ${message}`)
}
