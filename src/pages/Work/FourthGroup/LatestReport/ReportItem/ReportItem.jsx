import cn from "classnames"
import s from "./ReportItem.module.css"

const ReportItem = ({active, setActive, color, title}) => {
	const styles = {color: color}

	return (
		<div className={s.wrapper}>
			<div
				className={active ? s.title : cn(s.title, s.disabled)}
				style={active ? styles : null}
				onClick={setActive}
				>
				{title}
				<div className={s.arrow}>›</div>
			</div>
			<div className={s.content}>
				Herllllllooo
			</div>
		</div>
	)
}

export default ReportItem