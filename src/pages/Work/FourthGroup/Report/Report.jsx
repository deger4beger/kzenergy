import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import s from "./Report.module.css"
import reportIconDark from "assets/work/reportIconDark.png"
import reportIconLight from "assets/work/reportIconLight.png"
import { useTheme } from '../../../../hooks/useTheme';
import FormBlock from "./FormBlock/FormBlock"
import work from "../../../../store/workFourthStore.js"
import { MainButton } from '../../../../components/Button/Button';
import Modal from "../../../../components/Modal/Modal"

const Report = () => {
	const { t } = useTranslation()
	const [theme] = useTheme()
	const [active, setActive] = useState(false)
	const [firstData, setFirstData] = useState(work.getCoefFirst)
	const [secData, setSecData] = useState(work.getCoefSec)

	const isUnsavedChanges = () => {
		let isUnsaved = false
		for (let [key, value] of Object.entries(firstData)) {
			if (value !== work.getCoefFirst[key]) {
				isUnsaved = true
			}
		}
		for (let [key, value] of Object.entries(secData)) {
			if (value !== work.getCoefSec[key]) {
				isUnsaved = true
			}
		}
		return isUnsaved
	}


	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.title}>{t("work.fourthGroup.title")}</div>
				<img
					src={theme === "dark" ? reportIconDark : reportIconLight}
					alt="#"
					className={s.icon}
				/>
				<div className={s.infoBlock}>
					<div className={s.infoItem}>
						{t("work.fourthGroup.signedBy")}: <span>{work.workData.user.fullName}</span>
					</div>
					<div className={s.infoItem}>
						{t("work.thirdGroup.date")}: <span>{work.workData.date}</span>
					</div>
				</div>
				<FormBlock
					firstData={firstData}
					secData={secData}
					setFirstData={setFirstData}
					setSecData={setSecData}
				/>
				<div className={s.button} onClick={() => setActive(!active)}>
					<div>{t("work.fourthGroup.makeCalc")}</div>
				</div>
				<Modal active={active} setActive={setActive}>
					<div className={s.modalInfo}>
						<div>
							{t("work.fourthGroup.confCalc")}
						</div>
						<div>
							{t("work.fourthGroup.attention1")}
						</div>
						{isUnsavedChanges() && <div className={s.attention}>
							({t("work.fourthGroup.attention2")})
						</div>}
					</div>
					<MainButton
						content={t("other.modalConfirm")}
						onClick={() => void 0}
						styles={{
							fontSize: "var(--fsz24)",
							backgroundColor: "var(--forBg)"
						}}
					/>
				</Modal>
			</div>
		</div>
	)
}

export default observer(Report)