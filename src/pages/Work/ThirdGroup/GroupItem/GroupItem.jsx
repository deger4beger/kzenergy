import { useState } from 'react'
import cn from "classnames"
import s from "./GroupItem.module.css"

const GroupItem = ({isRecieved, title, children}) => {
	const [active, setActive] = useState(isRecieved)

	return (
		<div className={s.wrapper}>
			<div
				className={s.header} onClick={() => setActive(!active)}

				>
				<div className={active ? s.title : cn(s.title, s.disabled)}>
					<span className={isRecieved ? s.sign : cn(s.sign, s.red)}>
						{isRecieved ? "✓" : "☩"}
					</span>
					{title}
				</div>
				<div className={active ? s.icon : cn(s.icon, s.disabled)}>›</div>
			</div>
			<div className={active ? s.content : cn(s.content, s.disabled)}>
				{children}
			</div>
		</div>
	)
}

export default GroupItem