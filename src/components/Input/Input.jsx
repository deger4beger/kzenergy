import s from "./Input.module.css"

const Input = ({inputType="text", placeholder, value, onChange}) => {

	return (
		<input
			type={inputType}
			className={s.input}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	)
}

export default Input