import { NotFound } from '../../components/NotFound/NotFound'
import FirstSecondGroup from "./FirstSecondGroup/FirstSecondGroup"
import { withoutAuthRedirect } from '../../hocs/withoutAuthRedirect'
import auth from "../../store/authStore"
import { observer } from 'mobx-react-lite';

const Work = () => {

	switch(auth.myData.role) {
		case "objWorker":
		case "chemWorker":
			return <FirstSecondGroup role={auth.myData.role} />
		default: // miningWorker, EPWorker
			return <NotFound />
	}
}

export default withoutAuthRedirect(observer(Work))