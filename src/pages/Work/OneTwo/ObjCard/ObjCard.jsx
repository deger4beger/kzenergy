import cn from "classnames"
import s from "./ObjCard.module.css"
import { useTranslation } from "react-i18next";

const ObjCard = ({index, image, active, onItemClick, info}) => {
	const { t, i18n } = useTranslation()


	return (
		<div
			className={active ? cn(s.item, s.active) : s.item}
			onClick={onItemClick}
		>
			<img
				src={image}
				alt=""
				className={s.image}/>
			<div className={s.info}>{info}</div>
		</div>
	)
}

export default ObjCard