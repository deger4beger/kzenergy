import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import fileSaver from "file-saver"
import cn from "classnames"
import s from "./LatestReport.module.css"
import ReportItem from "./ReportItem/ReportItem"
import { MainButton } from '../../../../components/Button/Button';
import excelIconDark from "assets/work/excelIconDark.png"
import excelIconLight from "assets/work/excelIconLight.png"
import excelIconSmallDark from "assets/excelIconSmallDark.png"
import excelIconSmallLight from "assets/excelIconSmallLight.png"
import { useTheme } from '../../../../hooks/useTheme'
import { animateScroll as scroll } from "react-scroll"
import { colors } from '../../../../store/staticObjects';

const LatestReport = ({isActive=false, finalData, date, name, isSameUser, excelUrl, percents, onNameClick}) => {
	const { t } = useTranslation()
	const [theme] = useTheme()
	const [active, setActive] = useState({0: isActive, 1: isActive, 2: isActive})
	const [activeMain, setActiveMain] = useState(isActive)

	useEffect(() => {
		if (isActive) scroll.scrollTo(520)
	}, [isActive])

	const isAtLeastOneActive = () => {
		for (let value of Object.values(active)) {
			if (value) {
				return true
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
	const onDownloadExcel = (e) => {
		e.stopPropagation()
		fileSaver.saveAs(
  			excelUrl,
  			`Report (${date}).xlsx`
		)
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
				<div className={s.excelButtonSmall}>
					<MainButton
						content={"Excel"}
						onClick={onDownloadExcel}
						isLoading={false}
						disabled={false}
						icon={theme === "dark" ? excelIconSmallDark : excelIconSmallLight}
						styles={{
							color: "var(--main)",
							width: "100px"
						}}
					/>
				</div>
			</div>
			<div className={s.content}>
				<div className={s.contentInfo}>
					<span className={s.left}>{t("work.thirdGroup.user")}:</span>
					<span className={s.name} onClick={onNameClick}>
						{name}
					</span>
					{isSameUser && <span className={s.you}>({t("other.you")})</span>}
				</div>
				<div className={s.contentInfo}>
					<span className={s.left}>{t("work.thirdGroup.date")}:</span>
					{date}
				</div>
				{colors.map((el, index) => <ReportItem
					key={index}
					active={active[index]}
					setActive={() => onSetActiveChild(index)}
					color={el}
					title={t(`work.thirdGroup.type${index+1}`)}
					data={finalData[index]}
					percents={percents[index]}
					last={index + 1 === colors.length}
				/>)}
				<div className={s.excelButton}>
					<MainButton
						content={"Excel"}
						onClick={onDownloadExcel}
						isLoading={false}
						disabled={false}
						icon={theme === "dark" ? excelIconDark : excelIconLight}
						styles={{
							fontSize: "var(--fsz24)",
							backgroundColor: "var(--secBg)",
							color: "var(--main)",
							width: "220px",
							height: "50px"
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default LatestReport