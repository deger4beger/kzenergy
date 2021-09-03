import cn from "classnames"
import { useTranslation } from 'react-i18next';
import s from "./Status.module.css"
import usersStore from "../../../../store/usersStore.js"

const Status = ({workData}) => {
	const { t } = useTranslation()
	const elems = ["compressor", "powerplant", "boiler", "sweetGas"]

	return (
		<div className={s.none}>
			<div className={s.title}>{t("work.fourthGroup.notSigned")} ヽ(°□° )ノ</div>
			{[...Array(4)].map((el, index) => {
				return <div className={s.statusElem} key={index}>
					<span className={workData[elems[index]] ? s.titles : cn(s.titles, s.disabled)}>
						{index+1}) {t(`work.obj${index+1}`)}:
					</span>
					{workData[elems[index]] ? (
						<>
							<span className={s.name} onClick={() => usersStore.getUser(workData[elems[index]].id)}>
								{workData[elems[index]].fullName}
							</span>
							<span className={s.date}>{workData[elems[index]].date}</span>
						</>
						) : t("other.none")
					}
				</div>
			})}
			<div className={s.statusElem}>
				<span className={cn(s.titles, s.disabled)}>5) {t(`other.role2`)}:</span>{t("other.none")}
			</div>
		</div>
	)
}

export default Status