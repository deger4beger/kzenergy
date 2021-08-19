import cn from "classnames"
import s from "./OptionCard.module.css"

const OptionCard = ({content, color="var(--main)", active, disabled, isSign, onClick}) => {

	return (
		<div className={cn(s.option, {[s.disabled]: disabled})} onClick={onClick}>
			{isSign && <div className={s.sign}>
				<div className={s.signInner} style={active ? {backgroundColor: color} : null}/>
			</div>}
			<div className={s.content} style={active ? {color} : null}>
				{content}
			</div>
		</div>
	)
}

export default OptionCard