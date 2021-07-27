import { useParams } from "react-router-dom"
import { observer } from 'mobx-react-lite';
import { NotFound } from '../../components/NotFound/NotFound'
import FirstSecondGroup from "./FirstSecondGroup/FirstSecondGroup"
import ThirdGroup from "./ThirdGroup/ThirdGroup"
import FourthGroup from "./FourthGroup/FourthGroup"
import { withoutAuthRedirect } from '../../hocs/withoutAuthRedirect'
import auth from "../../store/authStore"

const Work = () => {
	const { scroll } = useParams()

	switch(auth.myData.role) {
		case "compressor":
		case "boiler":
		case "powerplant":
		case "chemical":
			return <FirstSecondGroup role={auth.myData.role} />
		case "mining":
			return <ThirdGroup />
		case "EPWorker":
			return <FourthGroup isActive={!!scroll}/>
		default:
			return <NotFound />
	}
}

export default withoutAuthRedirect(observer(Work))