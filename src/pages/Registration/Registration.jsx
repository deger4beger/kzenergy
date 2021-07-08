import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite"
import { MainButton } from '../../components/Button/Button';
import { FormLogicRegister } from './FormLogicRegister';
import { hasErrorReg } from '../../validators/Validator';
import { withAuthRedirect } from '../../hocs/withAuthRedirect';
import auth from "../../store/authStore"
import InputBlock from "../../components/InputBlock/InputBlock"
import SelectReg from "./SelectReg/SelectReg"
import s from "./Registration.module.css"
import { useTheme } from '../../hooks/useTheme';

const Registration = () => {
	const { t } = useTranslation()
	const [theme] = useTheme()
	const history = useHistory()

	const {
		email, password, role, confPass, name, secretKey, error,
		setError,
		onEmailChange, onNameChange, onRoleChange, onPasswordChange, onConfPassChange, onSecretKeyChange,
		errorReset
	} = FormLogicRegister()

	useEffect(() => {
		return () => {
			auth.errorReset()
		}
	}, [])

	const onSubmit = () => {
		if (hasErrorReg(email, password, name, setError)) return
		if (role === "") {
			errorReset({role: "You must choose the role"})
			return
		}
		if (password !== confPass) {
			errorReset({confirmPassword: "Password doesn't match"})
			return
		}
		if (secretKey === "") {
			errorReset({secretKey: "Field is required"})
			return
		}
		auth.register({email, password, fullName: name, role, identificationKey: secretKey}, history)
	}
	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("login.signUp")}
			</div>
			<div className={s.loginForm}>
				<InputBlock
					last={false}
					title={t("login.email")}
					inputType="email"
					placeholder={t("login.email")}
					value={email}
					onChange={onEmailChange}
					error={error?.email}
				/>
				<InputBlock
					last={false}
					title={t("login.name")}
					inputType="text"
					placeholder={t("login.name")}
					value={name}
					onChange={onNameChange}
					error={error?.name}
				/>
				<InputBlock
					title={t("login.role")}
					error={error?.role}
					questionMark={true}
					questionText={"The department where you working at"}
					>
					<SelectReg
						value={role}
						onChange={onRoleChange}
					/>
				</InputBlock>
				<InputBlock
					last={false}
					title={t("login.password")}
					inputType="password"
					placeholder={t("login.password")}
					value={password}
					onChange={onPasswordChange}
					error={error?.password}
				/>
				<InputBlock
					last={false}
					title={t("login.confPass")}
					inputType="password"
					placeholder={t("login.confPass")}
					value={confPass}
					onChange={onConfPassChange}
					error={error?.confirmPassword}
				/>
				<InputBlock
					last={true}
					title={t("login.secretKey")}
					inputType="text"
					placeholder={t("login.secretKey")}
					value={secretKey}
					onChange={onSecretKeyChange}
					error={error?.secretKey}
					questionMark={true}
					questionText={"The company's secret key, find out in the administration"}
				/>
				<div className={s.globalError}>
					{auth.error}
				</div>
				<div className={s.margin} />
				<MainButton
					content={t("login.signUp")}
					onClick={onSubmit}
					isLoading={auth.loading}
					disabled={false}
					preloaderWhite={theme === "dark" ? true : false}
					styles={{
						padding: "3px 14px",
						fontSize: "var(--fsz24)",
					}}
				/>
			</div>
		</div>
	)
}

export default withAuthRedirect(observer(Registration))