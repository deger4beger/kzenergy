import s from "./Archive.module.css"
import { withoutAuthRedirect } from "../../hocs/withoutAuthRedirect"
import { observer } from 'mobx-react-lite';
import { NotFound } from '../../components/NotFound/NotFound'
import auth from "../../store/authStore"
import { useEffect, useState } from 'react'
import MenuItem from "./MenuItem/MenuItem"
import { useTranslation } from 'react-i18next'
import OneTwoGroups from "./OneTwoGroups/OneTwoGroups"
import ThirdGroup from "./ThirdGroup/ThirdGroup"
import FourthGroup from "./FourthGroup/FourthGroup"
import archive from "../../store/archiveStore.js"
import { Preloader } from '../../components/Preloader/Preloader';
import { groups } from '../../store/staticObjects';

const Archive = () => {
	const { t } = useTranslation()
	const [selectedGroup, setSelectedGroup] = useState(auth.myData.role)

	useEffect(() => {
		archive.getFinalReport(selectedGroup)
		return () => archive.setWorkData(null)
	}, [selectedGroup])

	const getComponent = () => {
		switch(selectedGroup) {
			case "compressor":
			case "boiler":
			case "powerplant":
			case "chemical":
				return <OneTwoGroups
					group={selectedGroup}
				/>
			case "mining":
				return <ThirdGroup
				/>
			case "EPWorker":
				return <FourthGroup
				/>
			default:
				return <NotFound />
		}
	}
	const onMenuItemClick = (group) => {
		if (group === selectedGroup) return
		archive.setWorkData(null)
		setSelectedGroup(group)
	}

	return <div className={s.wrapper}>
		<div className={s.menuItems}>
			{groups.map((el, index) => {
				return <MenuItem
					key={index}
					content={index < 3 ? t(`work.obj${index+1}`) : t(`other.role${index-2}`)}
					active={selectedGroup === el}
					disabled={[4, 5].includes(groups.indexOf(auth.myData.role)) ? false : (
						el !== auth.myData.role
					)}
					loading={archive.loading && selectedGroup !== groups[index]}
					onItemClick={() => onMenuItemClick(el)}
				/>
			})}
		</div>
		{(!!archive.workData?.length && !!archive.workData) && getComponent()}
		{(!archive.workData || archive.loading) && <Preloader />}
		{(archive.workData?.length === 0 && !archive.loading) && (
			<div className={s.noData}>{t("archive.noData")} ヽ(°□° )ノ</div>
		)}
	</div>
}

export default withoutAuthRedirect(observer(Archive))