import cn from "classnames"
import s from "./MenuItem.module.css"

const MenuItem = ({content, disabled, active, onItemClick, loading}) => {


	return (
		<div
			className={cn(s.menuItem, {[s.disabled]: disabled, [s.loading]: loading})}
			onClick={onItemClick}
			>
			<div className={cn(s.activeSign)}>
				<div className={cn(s.activeSignInner, {[s.active]: active})} />
			</div>
			<span className={cn(s.content, {[s.active]: active})}>{content}</span>
			{disabled && <div className={s.disabledSign}>🛇</div>}
		</div>
	)
}

export default MenuItem