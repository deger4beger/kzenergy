import validator from "validator"

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = value => {
	if (value) return undefined
	return "validation.required"
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

const MaxLength50 = (value) => {
	if (!value) return undefined
	if (value.length > 50) return `validation.maxLength`
	return undefined
}
const MinLength5 = (value) => {
	if (!value) return undefined
	if (value.length < 5) return `validation.minLength`
	return undefined
}

export const isEmail = value => {
	if (!value) return undefined
	if (validator.isEmail(value)) {
		return undefined
	}
	return "validation.email"
}

export const isNumber = value => {
	if (!value) return undefined
	if (validator.isInt(value)) {
		return undefined
	}
	return "validation.number"
}

const validatorsTable = [required, isNumber]

const validatorsPass = [MinLength5, MaxLength50, required]
const validatorsEmail = [MinLength5, MaxLength50, required, isEmail]
const validatorsName = [MinLength5, MaxLength50, required]

export const hasErrorReg = (email, password, name, setError) => {
	let emailError, passwordError, nameError
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
	for (let i of validatorsName) {
		if (i(name)) {
			setError(prev => ({
				...prev,
				name: i(name)
			}))
			nameError = true
			break
		}
	}

	if (emailError || passwordError || nameError) return {emailError, passwordError, nameError}
	return false
}

export const hasErrorLog = (email, password, setError) => {
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

export const hasErrorTableValue = (value) => {
	for (let i of validatorsTable) {
		if (i(value)) {
			return i(value)
			break
		}
	}
	return false
}