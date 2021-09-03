import cn from "classnames"
import s from "./Input.module.css"
import { useState } from 'react';

const Input = ({inputType="text", placeholder, value, onChange}) => {
	const [isCrossedOut, setIsCrossedOut] = useState(false)
	const [currInputType, setCurrInputType] = useState(inputType)

	const onShowPassClick = () => {
		if (inputType !== "password") return
		currInputType === "password" ? setCurrInputType("text") : setCurrInputType("password")
		setIsCrossedOut(prev => !prev)
	}

	return (
		<div className={s.inputBlock}>
			<input
				type={currInputType}
				className={s.input}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{inputType === "password" && <div className={s.showPass}>
				<div
					className={cn(s.showPassInner, {[s.crossedOut]: isCrossedOut})}
					onClick={onShowPassClick}
					>
					👁
				</div>
			</div>}
		</div>
	)
}

export default Input