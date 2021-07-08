import s from "./Archive.module.css"
import { withoutAuthRedirect } from "../../hocs/withoutAuthRedirect"

const Archive = () => {


	return (
		<div className={s.wrapper}>
			Archive
		</div>
	)
}

export default withoutAuthRedirect(Archive)