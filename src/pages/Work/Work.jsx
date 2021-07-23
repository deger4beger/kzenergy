import { NotFound } from '../../components/NotFound/NotFound'
import FirstSecondGroup from "./FirstSecondGroup/FirstSecondGroup"
import ThirdGroup from "./ThirdGroup/ThirdGroup"
import FourthGroup from "./FourthGroup/FourthGroup"
import { withoutAuthRedirect } from '../../hocs/withoutAuthRedirect'
import auth from "../../store/authStore"
import { observer } from 'mobx-react-lite';

const Work = () => {

	switch(auth.myData.role) {
		case "compressor":
		case "boiler":
		case "powerplant":
		case "chemical":
			return <FirstSecondGroup role={auth.myData.role} />
		case "mining":
			return <ThirdGroup />
		case "EPWorker":
			return <FourthGroup />
		default:
			return <NotFound />
	}
}

export default withoutAuthRedirect(observer(Work))