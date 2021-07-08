import { useState } from "react"
import { hasErrorReg } from '../../validators/Validator';

export const FormLogicRegister = () => {

	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [role, setRole] = useState("")
	const [password, setPassword] = useState("")
	const [confPass, setConfPass] = useState("")
	const [secretKey, setSecretKey] = useState("")
	const [error, setError] = useState({
		email: null,
		name: null,
		role: null,
		password: null,
		confirmPassword: null,
		secretKey: null
	})

	const onEmailChange = (e) => {
		setEmail(e.currentTarget.value)
		checkErrorHelper(e.currentTarget.value, password, name)
	}
	const onNameChange = (e) => {
		setName(e.currentTarget.value)
		checkErrorHelper(email, password, e.currentTarget.value)
	}
	const onRoleChange = (e) => {
		setRole(e.currentTarget.value)
		if (e.currentTarget.value && error.role !== null) {
			errorReset({role: null})
		}
	}
	const onPasswordChange = (e) => {
		setPassword(e.currentTarget.value)
		checkErrorHelper(email, e.currentTarget.value, name)
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

	const onSecretKeyChange = (e) => {
		setSecretKey(e.currentTarget.value)
		if ((e.currentTarget.value.length !== 0) && error.secretKey !== null) {
			errorReset({secretKey: null})
		}
	}

	const checkErrorHelper = (email, password, name) => {
		if (!error.email && !error.password && !error.name) {
			return
		}
		const { emailError, passwordError, nameError } = hasErrorReg(email, password, name, setError)
		if (!emailError) {
			errorReset({email: null})
		}
		if (!passwordError) {
			errorReset({password: null})
		}
		if (!nameError) {
			errorReset({name: null})
		}
	}

	const errorReset = (errors) => {
		setError(prev => ({
			...prev,
			...errors
	}))}

	return {
		email, password, role, confPass, name, secretKey, error,
		setError,
		onEmailChange, onNameChange, onRoleChange, onPasswordChange, onConfPassChange, onSecretKeyChange,
		errorReset
	}
}