import s from "./SelectReg.module.css"
import { useTranslation } from "react-i18next";

const SelectReg = ({value, onChange}) => {
	const { t, i18n } = useTranslation();

	return (
		<select
			value={value}
			onChange={onChange}
			className={s.select}>
			<option value="">{t("other.selectRole")}</option>
			<option value="objWorker">{t("other.role1")}</option>
			<option value="chemWorker">{t("other.role2")}</option>
			<option value="miningWorker">{t("other.role3")}</option>
			<option value="EPWorker">{t("other.role4")}</option>
		</select>
	)
}

export default SelectReg