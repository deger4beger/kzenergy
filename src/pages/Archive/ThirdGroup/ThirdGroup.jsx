import { observer } from 'mobx-react-lite';
import archive from "../../../store/archiveStore.js"
import auth from "../../../store/authStore.js"
import ArchiveItem from '../ArchiveItem/ArchiveItem';
import { toJS } from 'mobx';

const ThirdGroup = () => {


	return (
		<div>
			{toJS(archive.workData).map((el, index) => {
				return <ArchiveItem
					key={index}
					user={el.user.fullName}
					date={el.date}
					index={index + 1}
					isSameUser={auth.myData.id === el.user.id}
				/>
			})}
		</div>
	)
}

export default observer(ThirdGroup)