import { useEffect } from 'react';
import cn from "classnames"
import s from "./FourthGroup.module.css"
import Report from "./Report/Report"
import work from "../../../store/workFourthStore"
import { Preloader } from '../../../components/Preloader/Preloader';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const FourthGroup = () => {
	const { t } = useTranslation()
	const elems = ["compressor", "powerplant", "boiler", "sweetGas"]

	useEffect(() => {
		work.getFinalReport()
		return () => {
			work.setWorkData(null)
		}
	}, [])

	if (!work.workData) return <Preloader />
	return (
		<div className={s.wrapper}>
			{work.workData.date && <Report /> }
			{!work.workData.date && <div className={s.none}>
				<div className={s.title}>{t("work.fourthGroup.notSigned")} ヽ(°□° )ノ</div>
				{[...Array(4)].map((el, index) => {
					return <div className={s.statusElem}>
						<span className={work.workData[elems[index]] ? s.titles : cn(s.titles, s.disabled)}>
							{index+1}) {t(`work.obj${index+1}`)}:
						</span>
						{work.workData[elems[index]] ? work.workData[elems[index]] : "none"}
					</div>
				})}
				<div className={s.statusElem}>
					<span className={cn(s.titles, s.disabled)}>5) {t(`other.role2`)}:</span>none
				</div>
			</div>}
		</div>
	)
}

export default observer(FourthGroup)