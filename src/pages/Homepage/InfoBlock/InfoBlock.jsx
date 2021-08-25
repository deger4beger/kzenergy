import { animateScroll as scroll } from "react-scroll"
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom"
import s from "./InfoBlock.module.css"

const InfoBlock = () => {
	const { t } = useTranslation()
	const history = useHistory()

	const onClick = () => {
		scroll.scrollTo(880, {
			duration: 500
		})
	}
	const onLinkClick = (e) => {
		e.stopPropagation()
		window.open("https://vk.com/doc173450504_612526855", "_blank")
	}

	return (
		<>
			<div className={s.info} onClick={onClick}>
				<div>{t("homepage.moreStat")}</div>
				<div className={s.down}>
					<div>›</div>
					<div>›</div>
					<div>›</div>
				</div>
				<div className={s.tooltip}>
					{t("homepage.info")}
					<span className={s.tooltipLink} onClick={onLinkClick}>
						{t("header.route3")}
					</span>
				</div>
			</div>
			<div className={s.margin} />
		</>
	)
}

export default InfoBlock