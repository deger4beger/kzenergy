import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { observer } from "mobx-react-lite"
import i18next from "i18next"
import cn from "classnames"
import { MainButton } from '../../components/Button/Button';
import { hasError } from '../../validators/Validator';
import { FormLogic } from './FormLogic';
import { withAuthRedirect } from '../../hocs/withAuthRedirect';
import auth from "../../store/authStore"
import InputBlock from "../../components/InputBlock/InputBlock"
import GoogleLogin from "./GoogleLogin/GoogleLogin"
import s from "./Login.module.css"
import { useTranslation } from "react-i18next";

const Login = () => {
	const { t, i18n } = useTranslation()

	const history = useHistory()
	const {
		email, password, error,
		setError,
		onEmailChange, onPasswordChange
	} = FormLogic()

	const onSubmit = () => {
		if (hasError(email, password, setError)) return
		auth.auth({email, password}, history)
	}

	useEffect(() => {
		return () => {
			auth.errorReset()
		}
	}, [])

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("login.login")}
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
					last={true}
					title={t("login.password")}
					inputType="password"
					placeholder={t("login.password")}
					value={password}
					onChange={onPasswordChange}
					error={error?.password}
					info={t("login.logInfo")}
					infoLink={t("login.signUp")}
					linkTo="registration"
				/>
				<div className={s.globalError}>
					{auth.error}
				</div>
				<MainButton
					content={t("login.login")}
					onClick={onSubmit}
					isLoading={auth.loading}
					disabled={false}
					preloaderWhite={true}
					styles={{
						padding: "2px 14px",
						fontSize: "26px",
						color: "var(--color)"
					}}
				/>
				<div className={s.or}>{t("login.logInfoGoogle")}</div>
				<GoogleLogin
					auth={auth}
				/>
			</div>
		</div>
	)
}

export default withAuthRedirect(observer(Login))