import cn from "classnames"
import { Link } from "react-router-dom"
import s from "./InputBlock.module.css"
import Input from "../Input/Input"

const InputBlock = ({last, title, inputType, placeholder, value, onChange,
	error, info, infoLink, linkTo, children, questionMark, questionText }) => {


	return (
		<div className={last ? cn(s.inputBlock, s.last) : s.inputBlock}>
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
			{error && <div className={info ? cn(s.error, s.shifted) : s.error}>
				{error}
			</div>}
			{info && <div className={s.info}>{info}&nbsp;
				<Link className={s.infoReg} to={linkTo}>{infoLink}</Link>
			</div>}
			{questionMark && <div className={s.questionMark}>
				?
			</div>}
			{questionText && <div className={s.questionText}>
				{questionText}
			</div>}
		</div>
	)
}

export default InputBlock