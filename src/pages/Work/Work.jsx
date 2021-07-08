import { NotFound } from '../../components/NotFound/NotFound';
import FirstSecondGroup from "./FirstSecondGroup/FirstSecondGroup"
import { withoutAuthRedirect } from '../../hocs/withoutAuthRedirect';

const Work = () => {

	switch("d") {
		case "d":
		case "L":
			return <FirstSecondGroup />
		default:
			return <NotFound />
	}
}

export default withoutAuthRedirect(Work)