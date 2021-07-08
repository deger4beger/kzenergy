import s from "./Homepage.module.css"
import { withoutAuthRedirect } from '../../hocs/withoutAuthRedirect';

const Homepage = () => {


	return (
		<div className={s.wrapper}>
			Homepage
		</div>
	)
}

export default withoutAuthRedirect(Homepage)