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

const Registration = () => {
	const { t } = useTranslation()
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
			errorReset({role: "validation.role"})
			return
		}
		if (password !== confPass) {
			errorReset({confirmPassword: "validation.confPass"})
			return
		}
		if (secretKey === "") {
			errorReset({secretKey: "validation.required"})
			return
		}
		auth.register({email, password, fullName: name, role, identificationKey: secretKey}, history)
	}

	const onEnterClick = (e) => {
        if (e.key === "Enter") {
        	e.preventDefault()
            onSubmit()
        }
    }

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("login.signUp")}
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
					questionText={t("login.info1")}
					>
					<SelectReg
						value={role}
						onChange={onRoleChange}
						values={[
							"compressor",
							"powerplant",
							"boiler",
							"chemical",
							"mining",
							"EPWorker"
						]}
						names={[
							"work.obj1",
							"work.obj2",
							"work.obj3",
							"other.role1",
							"other.role2",
							"other.role3"
						]}
						firstName={"other.selectRole"}
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
					questionText={t("login.info2")}
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