import { NotFound } from '../../components/NotFound/NotFound';
import OneTwo from "./OneTwo/OneTwo"
import { withoutAuthRedirect } from '../../hocs/withoutAuthRedirect';

const Work = () => {

	switch("d") {
		case "d":
		case "L":
			return <OneTwo />
		default:
			return <NotFound />
	}
}

export default withoutAuthRedirect(Work)