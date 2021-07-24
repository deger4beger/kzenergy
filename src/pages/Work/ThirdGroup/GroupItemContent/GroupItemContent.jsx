import cn from "classnames"
import s from "./GroupItemContent.module.css"
import { useTranslation } from 'react-i18next';

const GroupItemContent = ({user, date, gasType, children, isSameUser}) => {
	const { t } = useTranslation()

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("work.thirdGroup.user")}: <span className={user ? cn(s.value, s.user) : s.value}>
					{user ? user : t("other.none")}
				</span>
				{isSameUser && <div className={s.sameUser}>({t("other.you")})</div>}
			</div>
			<div className={s.title}>
				{t("work.thirdGroup.date")}: <span className={date ? cn(s.value, s.active) : s.value}>
					{date ? date : t("other.none")}
				</span>
			</div>
			{gasType && <div className={s.title}>
				{t("work.thirdGroup.gasType")}: <span className={date ? cn(s.value, s.gas) : s.value}>
					{gasType ? gasType : t("other.none")}
				</span>
			</div>}
			{children && <div className={s.content}>
				{children}
			</div> }
		</div>
	)
}

export default GroupItemContent