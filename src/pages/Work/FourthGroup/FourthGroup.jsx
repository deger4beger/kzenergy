import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import s from "./FourthGroup.module.css"
import Report from "./Report/Report"
import work from "../../../store/workFourthStore"
import auth from "../../../store/authStore"
import { Preloader } from '../../../components/Preloader/Preloader';
import Status from "./Status/Status"
import LatestReport from "./LatestReport/LatestReport"
import { useTranslation } from 'react-i18next';

const FourthGroup = ({isActive}) => {
	const { t } = useTranslation()

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
			{!work.workData.date && <Status workData={work.workData.status} />}
			{work.workData.archive && (
				<LatestReport
					finalData={work.finalData}
					percents={work.finalPercents}
					date={work.workData.archive.date}
					name={work.workData.archive.user.fullName}
					isSameUser={auth.myData.id === work.workData.archive.user.id}
					excelUrl={work.workData.archive.excel}
					isActive={isActive}
				/>
			)}
			{!work.workData.date && !work.workData.archive && (
				<div className={s.noReport}>{t("work.fourthGroup.noReports")}</div>
			)}
		</div>
	)
}

export default observer(FourthGroup)