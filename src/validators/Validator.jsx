import validator from "validator"

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = value => {

	if (value) return undefined
	return "Field is required"
}

export const maxLenghtCreator = (maxLength) => (value) => {
	if (!value) return undefined
	if (value.length > maxLength) return `Max length - ${maxLength} symbols`
	return undefined
}

export const minLengthCreator = (minLength) => (value) => {
	if (!value) return undefined
	if (value.length < minLength) return `Min length - ${minLength} symbols`
	return undefined
}

export const isEmail = value => {
	if (!value) return undefined
	if (validator.isEmail(value)) {
		return undefined
	}
	return "Incorrect email"
}

const validatorsPass = [minLengthCreator(5), maxLenghtCreator(20), required]
const validatorsEmail = [minLengthCreator(5), maxLenghtCreator(20), required, isEmail]

export const hasError = (email, password, setError) => {
	let emailError, passwordError
	for (let i of validatorsEmail) {
		if (i(email)) {
			setError(prev => ({
				...prev,
				email: i(email)
			}))
			emailError = true
			break
		}
	}
	for (let i of validatorsPass) {
		if (i(password)) {
			setError(prev => ({
				...prev,
				password: i(password)
			}))
			passwordError = true
			break
		}
	}
	if (emailError || passwordError) return {emailError, passwordError}
	return false
}