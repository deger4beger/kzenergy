import cn from "classnames"
import s from "./ObjCard.module.css"
import { useTranslation } from "react-i18next";

const ObjCard = ({index, image, active, info, disabled}) => {
	const { t } = useTranslation()


	return (
		<div
			className={disabled ? cn(s.item, s.disabled) : active ? cn(s.item, s.active) : s.item}
		>
			<div className={s.imageBlock}>
				<img
					src={image}
					alt=""
					className={s.image}
				/>
			</div>
			<div className={s.info}>{t(info)}</div>
			<div className={s.checkMark}>✔</div>
		</div>
	)
}

export default ObjCard