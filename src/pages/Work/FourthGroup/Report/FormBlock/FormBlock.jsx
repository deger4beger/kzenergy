import { useState } from 'react';
import cn from "classnames"
import s from "./FormBlock.module.css"
import { useTranslation } from 'react-i18next'
import work from "../../../../../store/workFourthStore.js"
import { observer } from 'mobx-react-lite';

const FormBlock = ({firstData, setFirstData, secData, setSecData}) => {
	const [active, setActive] = useState(0)
	const [activeObj, setActiveObj] = useState({0: true, 1: true, 2: true})
	const { t } = useTranslation()
	const onSetActive = (index) => {
		setActive(index)
		if (index === 2) {
			setActiveObj({0: false, 1: false, 2: false})
		} else {
			setActiveObj({0: true, 1: true, 2: true})
		}
	}
	const onObjClick = (index) => {
		if (active !== 2) return
		setActiveObj(prev => ({
			...prev,
			[index]: !activeObj[index]
		}))
	}
	const onCoefChange = (e, index, isFirst=true) => {
		if (isFirst) {
			setFirstData(prev => ({
				...prev,
				[index]: e.target.value
			}))
		} else {
			setSecData(prev => ({
				...prev,
				[index]: e.target.value
			}))
		}
	}
	const onCoefReset = (index, isFirst=true) => {
		if (isFirst) {
			setFirstData(prev => ({
				...prev,
				[index]: work.getCoefFirst[index]
			}))
		} else {
			setSecData(prev => ({
				...prev,
				[index]: work.getCoefSec[index]
			}))
		}
	}
	const onCoefSubmit = (index, isFirst=true) => {
		if (isFirst) {
			work.updateCoef(forFirst1[index] + "coef", firstData[index], index)
		} else {
			work.updateCoef(forSec1[index] + "coef", secData[index], index+4)
		}
	}



	const forFirst1 = ["NO2", "NO", "SO2", "CO"]
	const forFirst2 = ["N", "N", "S", "C"]
	const forSec1 = ["CO2", "CH4", "N2O"]
	const forSec2 = [
		["work.secondGroup.name5", "work.secondGroup.info3"],
		["work.secondGroup.name6", null],
		["work.secondGroup.name7", null]
	]
	const forSec3 = ["10^3", "10^6", "10^6"]
	const forThird1 = [
		"work.firstGroup.name6Info",
		"work.firstGroup.name7Info",
		"work.firstGroup.name5Info"
	]
	const forThird2 = [null, true, null]
	const forThird3 = [
		["work.firstGroup.name2", "work.firstGroup.name2Info"],
		["work.firstGroup.name6", "work.firstGroup.name4Info"],
		["work.firstGroup.name5", "work.firstGroup.name5Info"]
	]

	return (
		<div className={s.formBlock}>
			<div className={s.title2}>
				{t("work.fourthGroup.formulas")}
			</div>
			<div className={s.formBtns}>
				{[...Array(3)].map((el, index) => {
					return <div
						className={active === index ? cn(s.formBtn, s.active) : s.formBtn}
						key={index}
						onClick={() => onSetActive(index)}
						>
						<div className={s.sign}>
							<div className={s.signInner} />
						</div>
						{t(`work.thirdGroup.type${index + 1}`)}
					</div>
				})}
			</div>
			<div>
				<div className={s.formsTitles}>
					{[...Array(3)].map((el, index) => {
						return <div
							className={s.formTitle}
							key={index}
							onClick={() => onObjClick(index)}
							>
							<div
								className={activeObj[index] ? cn(s.titleEl, s.active) : s.titleEl}
								>
								<span className={s.titleElInner}>
									✔
								</span>
								</div>
							<div>{t(`work.obj${index + 1}`)}</div>
						</div>
					})}
				</div>
				<div className={s.formsBlock}>
					{active === 0 && <div>
						{forFirst1.map((el, index) => {
							return <div className={s.form} key={index}>
								<div className={s.beforeEqual}>
									<div className={s.first}>{el}</div>
									<span>
										({t("work.firstGroup.name5Info")})
									</span>
									<div className={s.equal}>=</div>
								</div>
								{t("work.firstGroup.name1")}
								<span>({t("work.firstGroup.name1Info")})</span> ×
								ρ<span>({t("work.secondGroup.info2")})</span> ×&nbsp;
								{forFirst2[index]}<span>({t("work.secondGroup.info1")})</span>
								&nbsp;× <div className={s.koefBlock}>
									<input
										className={work.loadingCoef[index] ? cn(s.koef, s.loading) : s.koef}
										placeholder="?"
										value={firstData[index]}
										onChange={(e) => onCoefChange(e, index)}
										onKeyPress={(event) => {
									        if (!/[0-9.]/.test(event.key)) {
									          	event.preventDefault()
									        }
									    }}
									/>
									{(firstData[index] !== work.getCoefFirst[index]) && (
										<div className={work.loadingCoef[index] ? cn(s.koefMenu, s.disabled) : s.koefMenu}>
											<div onClick={() => onCoefReset(index)}>
												<div className={s.close}>✗</div>
											</div>
											<div onClick={() => onCoefSubmit(index)}>
												✓
											</div>
										</div>
									)}
								</div>
							</div>
						})}
					</div>}
					{active === 1 && <div>
						{forSec1.map((el, index) => {
							return <div className={s.form} key={index}>
								<div className={s.beforeEqual}>
									<div className={s.second}>{el}</div>
										<span>({t("work.firstGroup.name5Info")})
									</span><div className={s.equal}>=</div>
								</div>
								{t("work.firstGroup.name1")}
								<span>({t("work.firstGroup.name1Info")})</span> ×
								ρ<span>({t("work.secondGroup.info2")})</span> ×
								Q<span>({t("work.secondGroup.info4")})</span> ×&nbsp;
								{t(forSec2[index][0])}
								{forSec2[index][1] && <span>({t(`${forSec2[index][1]}`)})</span>}
								&nbsp;/ {forSec3[index]}
								&nbsp;× <div className={s.koefBlock}>
									<input
										className={work.loadingCoef[index + 4] ? cn(s.koef, s.loading) : s.koef}
										placeholder="?"
										value={secData[index]}
										onChange={(e) => onCoefChange(e, index, false)}
										onKeyPress={(event) => {
									        if (!/[0-9.]/.test(event.key)) {
									          	event.preventDefault()
									        }
									    }}
									/>
									{(secData[index] !== work.getCoefSec[index]) && (
										<div className={work.loadingCoef[index + 4] ? cn(s.koefMenu, s.disabled) : s.koefMenu}>
											<div onClick={() => onCoefReset(index, false)}>
												<div className={s.close}>✗</div>
											</div>
											<div onClick={() => onCoefSubmit(index, false)}>
												✓
											</div>
										</div>
									)}
								</div>
							</div>
						})}
					</div>}
					{active === 2 && <div>
						{forThird1.map((el, index) => {
							if (!activeObj[0] && !activeObj[1] && !activeObj[2] && index === 0) {
								return <div
									className={s.ifNone}
									>
									{t("work.fourthGroup.selectObj")}
								</div>
							}
							return <div
								className={activeObj[index] ? s.form : cn(s.form, s.disabled)}
								key={index}
								>
								<div className={s.beforeEqual}>
									<div className={s.third}>E</div>
									<span>
										({t("work.firstGroup.name6Info")}/{t(el)})
									</span>
									<div className={s.equal}>=</div>
								</div>
								{t("work.firstGroup.name1")}
								<span>({t("work.firstGroup.name1Info")})</span>
								{forThird2[index] &&
									<>
										&nbsp;× t
										<span>({t("work.firstGroup.name3Info")})</span>
									</>
								}
								&nbsp;/&nbsp;
								{t(forThird3[index][0])}
								<span>({t(forThird3[index][1])})</span>
							</div>
						})}
					</div>}
				</div>
			</div>
		</div>
	)
}

export default observer(FormBlock)