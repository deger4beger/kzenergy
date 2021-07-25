import { useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cn from "classnames"
import s from "./LatestReport.module.css"
import ReportItem from "./ReportItem/ReportItem"
import work from "store/workFourthStore"

const LatestReport = ({isActive=false}) => {
	const { t } = useTranslation()
	const [active, setActive] = useState({0: isActive, 1: isActive, 2: isActive})
	const [activeMain, setActiveMain] = useState(isActive)
	const colors = ["var(--pollutants)", "var(--greenhouse)", "var(--efficiency)"]


	const isAtLeastOneActive = () => {
		for (let value of Object.values(active)) {
			if (value) {
				return true
				break
			}
		}
		return false
	}
	const onSetActive = () => {
		if (isAtLeastOneActive()) {
			setActive({0: false, 1: false, 2:false})
			setActiveMain(false)
		} else {
			setActive({0: true, 1: true, 2:true})
			setActiveMain(true)
		}
	}
	const onSetActiveChild = (index) => {
		setActive(prev => ({
			...prev,
			[index]: !active[index]
		}))
	}

	return (
		<div className={s.wrapper}>
			<div
				className={activeMain ? s.title : cn(s.title, s.disabled)}
				onClick={onSetActive}
				>
				{t("work.fourthGroup.lastReport")}
				{[...Array(3)].map((el, index) => {
					return <div className={s.circle} key={index}>
						<div className={active[index] ? s.circleInner : cn(s.circleInner, s.disabled)} />
					</div>
				})}
				<div className={s.arrow}>»</div>
			</div>
			<div className={s.content}>
				<div className={s.contentInfo}>
					<span className={s.left}>{t("work.thirdGroup.user")}:</span>
					<span className={s.name}>Deger Beger Ecologovich</span>
				</div>
				<div className={s.contentInfo}>
					<span className={s.left}>{t("work.thirdGroup.date")}:</span>
					2021-24-21
				</div>
				{colors.map((el, index) => <ReportItem
					key={index}
					active={active[index]}
					setActive={() => onSetActiveChild(index)}
					color={el}
					title={t(`work.thirdGroup.type${index+1}`)}
					data={work.finalData[index]}
				/>)}
				<div className={s.excelButton}>Excel</div>
			</div>
		</div>
	)
}

export default observer(LatestReport)