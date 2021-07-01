import { useState } from "react"
import { hasError } from '../../validators/Validator';

export const FormLogic = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confPass, setConfPass] = useState("")
	const [error, setError] = useState({
		email: null,
		password: null,
		confirmPassword: null,
	})

	const onEmailChange = (e) => {
		setEmail(e.currentTarget.value)
		checkErrorHelper(e.currentTarget.value, password)
	}
	const onPasswordChange = (e) => {
		setPassword(e.currentTarget.value)
		checkErrorHelper(email, e.currentTarget.value)
		if ((e.currentTarget.value === confPass) && error.confirmPassword !== null) {
			errorReset({confirmPassword: null})
		}
	}

	const onConfPassChange = (e) => {
		setConfPass(e.currentTarget.value)
		if ((password === e.currentTarget.value) && error.confirmPassword !== null) {
			errorReset({confirmPassword: null})
		}
	}

	const checkErrorHelper = (email, password) => {
		if (!error.username && !error.password) {
			return
		}
		const { emailError, passwordError } = hasError(email, password, setError)
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
		email, password, confPass, error,
		setEmail, setPassword, setConfPass, setError,
		onEmailChange, onPasswordChange, onConfPassChange,
		errorReset
	}
}