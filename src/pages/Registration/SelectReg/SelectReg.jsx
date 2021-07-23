import s from "./SelectReg.module.css"
import { useTranslation } from "react-i18next";

const SelectReg = ({value, onChange, values, names, firstName}) => {
	const { t } = useTranslation();

	return (
		<select
			value={value}
			onChange={onChange}
			className={s.select}>
			<option value="" disabled hidden>{t(firstName)}</option>
			{values.map((key, index) => {
				return <option className={s.option} value={key} key={index}>{t(names[index])}</option>
			})}
		</select>
	)
}

export default SelectReg