import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next";
import cn from "classnames"
import { observer } from "mobx-react-lite"
import { MainButton } from '../../components/Button/Button';
import { FormLogic } from '../Login/FormLogic';
import { hasError } from '../../validators/Validator';
import { withAuthRedirect } from '../../hocs/withAuthRedirect';
import auth from "../../store/authStore"
import InputBlock from "../../components/InputBlock/InputBlock"
import s from "./Registration.module.css"


const Registration = () => {
	const { t, i18n } = useTranslation();
	const history = useHistory()

	const {
		email, password, confPass, error,
		setError,
		onEmailChange, onPasswordChange, onConfPassChange,
		errorReset
	} = FormLogic()

	useEffect(() => {
		return () => {
			auth.errorReset()
		}
	}, [])

	const onSubmit = () => {
		if (hasError(email, password, setError)) return
		if (password !== confPass) {
			errorReset({confirmPassword: "Password doesn't match"})
			return
		}
		auth.register({email, password}, history)
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
					title={t("login.password")}
					inputType="password"
					placeholder={t("login.password")}
					value={password}
					onChange={onPasswordChange}
					error={error?.password}
				/>
				<InputBlock
					last={true}
					title={t("login.confPass")}
					inputType="password"
					placeholder={t("login.confPass")}
					value={confPass}
					onChange={onConfPassChange}
					error={error?.confirmPassword}
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
					preloaderWhite={true}
					styles={{
						padding: "2px 14px",
						fontSize: "26px",
					}}
				/>
			</div>
		</div>
	)
}

export default withAuthRedirect(observer(Registration))