import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import s from "./FourthGroup.module.css"
import Report from "./Report/Report"
import work from "../../../store/workFourthStore"
import { Preloader } from '../../../components/Preloader/Preloader';
import Status from "./Status/Status"
import LatestReport from "./LatestReport/LatestReport"


const FourthGroup = () => {

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
			{!work.workData.date && <Status workData={work.workData} />}
			<LatestReport />
		</div>
	)
}

export default observer(FourthGroup)