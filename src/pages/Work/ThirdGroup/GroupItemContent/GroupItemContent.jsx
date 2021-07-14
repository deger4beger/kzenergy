import cn from "classnames"
import s from "./GroupItemContent.module.css"

const GroupItemContent = () => {

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				User: <span className={s.value}></span>
			</div>
			<div className={s.title}>
				Date: <span className={s.value}></span>
			</div>
			<div className={s.title}>
				User: <span className={s.value}></span>
			</div>
		</div>
	)
}

export default GroupItemContent