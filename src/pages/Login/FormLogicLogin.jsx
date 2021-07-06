import { useState } from "react"
import { hasErrorLog } from '../../validators/Validator';

export const FormLogicLogin = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState({
		email: null,
		password: null,
	})

	const onEmailChange = (e) => {
		setEmail(e.currentTarget.value)
		checkErrorHelper(e.currentTarget.value, password)
	}
	const onPasswordChange = (e) => {
		setPassword(e.currentTarget.value)
		checkErrorHelper(email, e.currentTarget.value)
	}

	const checkErrorHelper = (email, password) => {
		if (!error.email && !error.password) {
			return
		}
		const { emailError, passwordError} = hasErrorLog(email, password, setError)
		if (!emailError) {
			errorReset({email: null})
		}
		if (!passwordError) {
			errorReset({password: null})
		}
	}

	const errorReset = (errors) => {
		setError(prev => ({
			...prev,
			...errors
	}))}

	return {
		email, password, error,
		setError,
		onEmailChange, onPasswordChange,
		errorReset
	}
}