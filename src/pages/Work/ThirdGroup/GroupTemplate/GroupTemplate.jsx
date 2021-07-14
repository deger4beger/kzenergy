import { useState } from 'react'
import cn from "classnames"
import s from "./GroupTemplate.module.css"
import { useTranslation } from 'react-i18next';

const GroupTemplate = ({title, mainColor, thirdType=true, children}) => {
	const { t } = useTranslation()
	const [active, setActive] = useState(true)

	return (
		<div
			className={s.wrapper}
			>
			<div
				className={s.container}
				style={active ? {borderColor: mainColor} : null}
				onClick={() => setActive(!active)}
			>
				<div className={s.left}>
					<div className={s.sign}>
						<div className={s.signInner} style={active ? {backgroundColor: mainColor} : null}/>
					</div>
					<div className={s.title}>
						{t(title)}
					</div>
				</div>
				<div className={s.right}>
					<div className={s.calcType}>
						<div className={cn(s.sign, s.calcType)}>
							<div className={cn(s.signInner, s.first)} />
						</div>
						<div className={s.calcName}>- {t("work.thirdGroup.type1")},</div>
					</div>
					<div className={s.calcType}>
						<div className={cn(s.sign, s.calcType)}>
							<div className={cn(s.signInner, s.second)} />
						</div>
						<div className={s.calcName}>- {t("work.thirdGroup.type2")}{thirdType && ","}</div>
					</div>
					{thirdType && <div className={s.calcType}>
						<div className={cn(s.sign, s.calcType)}>
							<div className={cn(s.signInner, s.third)} />
						</div>
						<div className={s.calcName}>- {t("work.thirdGroup.type3")}</div>
					</div> }
				</div>
			</div>
			<div className={active ? s.content : cn(s.content, s.hidden)}>
				{children}
			</div>
		</div>
	)
}

export default GroupTemplate