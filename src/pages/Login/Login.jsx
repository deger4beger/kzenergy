import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next";
import { MainButton } from '../../components/Button/Button';
import { hasErrorLog } from '../../validators/Validator';
import { FormLogicLogin } from './FormLogicLogin';
import { withAuthRedirect } from '../../hocs/withAuthRedirect';
import auth from "../../store/authStore"
import InputBlock from "../../components/InputBlock/InputBlock"
import s from "./Login.module.css"
import CustomCheckbox from '../../components/CustomCheckbox';

const Login = () => {
	const { t } = useTranslation()

	const history = useHistory()
	const {
		email, password, error, dontRememberMe,
		setError,
		onEmailChange, onPasswordChange, onDontRememberMeChange
	} = FormLogicLogin()

	const onSubmit = () => {
		if (hasErrorLog(email, password, setError)) return
		auth.auth({email, password}, history, dontRememberMe)
	}

	const onEnterClick = (e) => {
        if (e.key === "Enter") {
        	e.preventDefault()
            onSubmit()
        }
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
			<div className={s.loginForm} onKeyPress={onEnterClick}>
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
					noMargin={true}
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
				<div className={s.checkbox}>
					<CustomCheckbox
						checked={dontRememberMe}
						onClick={onDontRememberMeChange}
					/>
					<div className={s.checkboxInfo}>
						Don't remember me
					</div>
				</div>
				<div className={s.globalError}>
					{auth.error}
				</div>
				<MainButton
					content={t("login.login")}
					onClick={onSubmit}
					isLoading={auth.loading}
					disabled={false}
					styles={{
						padding: "2px 14px",
						fontSize: "26px",
						color: "var(--color)"
					}}
				/>
			</div>
		</div>
	)
}

export default withAuthRedirect(observer(Login))