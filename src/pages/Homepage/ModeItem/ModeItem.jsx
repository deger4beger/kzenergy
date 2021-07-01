import cn from "classnames"
import s from "./ModeItem.module.css"

const ModeItem = ({index, content, active, setActive, onItemClick, info}) => {
	return (
		<div
			className={active ? cn(s.item, s.active) : s.item}
			onClick={onItemClick}
		>
			<div className={s.content}>
				{content}
			</div>
			<div className={s.info}>{info}</div>
			{/*{active && <div>
				<div className={s.roof} />
				<div className={cn(s.roof, s.second)} />
			</div>}*/}
		</div>
	)
}

export default ModeItem