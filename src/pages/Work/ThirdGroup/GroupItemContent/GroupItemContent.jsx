import cn from "classnames"
import s from "./GroupItemContent.module.css"
import { useTranslation } from 'react-i18next';

const GroupItemContent = ({user, date, gasType, children}) => {
	const { t } = useTranslation()

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("work.thirdGroup.user")}: <span className={user ? cn(s.value, s.active) : s.value}>
					{user ? user : "none"}
				</span>
			</div>
			<div className={s.title}>
				{t("work.thirdGroup.date")}: <span className={date ? cn(s.value, s.active) : s.value}>
					{date ? date : "none"}
				</span>
			</div>
			{gasType && <div className={s.title}>
				{t("work.thirdGroup.gasType")}: <span className={date ? cn(s.value, s.gas) : s.value}>
					{gasType ? gasType : "none"}
				</span>
			</div>}
			{date && <div className={s.content}>
				{children}
			</div> }
		</div>
	)
}

export default GroupItemContent