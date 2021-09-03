import ArchiveItem from "../ArchiveItem/ArchiveItem"
import archive from "../../../store/archiveStore.js"
import auth from "../../../store/authStore.js"
import usersStore from "../../../store/usersStore.js"
import { observer } from 'mobx-react-lite';
import ReportItem from '../../Work/FourthGroup/LatestReport/ReportItem/ReportItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { colors } from '../../../store/staticObjects';

const FourthGroup = () => {
	const { t } = useTranslation()
	const [active, setActive] = useState(toJS(archive.workData).map(el => {
		return {0: true, 1: true, 2: true}
	}))
	const onSetActive = (index, secIndex) => {
		let copyState = [...active]
		copyState[index][secIndex] = !copyState[index][secIndex]
		setActive(copyState)
	}
	return (
		<div>
			{toJS(archive.workData).map((el, index) => {
				return <ArchiveItem
					key={index}
					user={el.user.fullName}
					date={el.date}
					index={index + 1}
					isSameUser={auth.myData.id === el.user.id}
					onUserClick={() => usersStore.getUser(el.user.id)}
					excelUrl={el.excel}
					>
					{colors.map((colorsEl, colorsIndex) => <ReportItem
						key={colorsIndex}
						active={active[index][colorsIndex]}
						setActive={() => onSetActive(index, colorsIndex)}
						color={colorsEl}
						title={t(`work.thirdGroup.type${colorsIndex+1}`)}
						data={archive.getFinalData(el)[colorsIndex]}
						last={colorsIndex + 1 === colors.length}
					/>)}
				</ArchiveItem>
			})}
		</div>
	)
}

export default observer(FourthGroup)