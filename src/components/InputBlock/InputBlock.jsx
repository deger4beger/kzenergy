import cn from "classnames"
import { Link } from "react-router-dom"
import s from "./InputBlock.module.css"
import Input from "../Input/Input"
import { useTranslation } from 'react-i18next';

const InputBlock = ({last, title, inputType, placeholder, value, onChange,
	error, info, infoLink, linkTo, children, questionMark, questionText, noMargin }) => {
	const { t } = useTranslation()

	return (
		<div
			className={last ? cn(s.inputBlock, s.last) : s.inputBlock}
			style={noMargin ? {marginBottom: 0} : null}>
			{title && <div className={s.inputTitle}>*{title}</div> }
			{!children && (
				<Input
					inputType={inputType}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			)}
			{children && (
				{...children}
			)}
			{questionMark && <div className={s.questionMark}>
				?
			</div>}
			{questionText && <div className={s.questionText}>
				{questionText}
			</div>}
			{error && <div className={info ? cn(s.error, s.shifted) : s.error}>
				{t(error)}
			</div>}
			{info && <div className={s.info}>{info}&nbsp;
				<Link className={s.infoReg} to={linkTo}>{infoLink}</Link>
			</div>}
		</div>
	)
}

export default InputBlock