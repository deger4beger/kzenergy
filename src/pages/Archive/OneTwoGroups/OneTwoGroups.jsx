import ArchiveItem from "../ArchiveItem/ArchiveItem"
import FirstGroupOnlyLogic from '../../Work/FirstSecondGroup/FirstGroupOnly/FirstGroupOnlyLogic';
import SecondGroupOnlyLogic from '../../Work/FirstSecondGroup/SecondGroupOnly/SecondGroupOnlyLogic';
import Table from '../../../components/Table/Table';
import archive from "../../../store/archiveStore.js"
import auth from "../../../store/authStore.js"
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const OneTwoGroups = ({group}) => {
	const { firstObjData, secObjData, thirdObjData } = FirstGroupOnlyLogic()
	const { objData } = SecondGroupOnlyLogic()

	const getObjData = () => {
		if (group === "compressor") {
			return firstObjData
		}
		if (group === "powerplant") {
			return secObjData
		}
		if (group === "boiler") {
			return thirdObjData
		}
		return objData
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
					gasType={group === "chemical" ? "work.obj4" : false}
					padding={true}
					>
					<Table
						{...getObjData()}
						data={archive.getTableData(group, el)}
						disabled={true}
						errors={[]}
					/>
				</ArchiveItem>
			})}
		</div>
	)
}

export default observer(OneTwoGroups)