import cn from "classnames"
import s from "./ReportItem.module.css"
import { useTranslation } from 'react-i18next';

const ReportItem = ({active, setActive, color, title, data, last, percents}) => {
	const { t } = useTranslation()
	const styles = {color: color}

	const isMinus = (percent) => {
		if (percent[0] === "-") {
			return percent.substr(1)
		} else {
			return false
		}
	}
	const isZero = (percent) => {
		if (percent[0] === "-") {
			if (percent[1] === "0") {
				return true
			}
		} else {
			if (percent[0] === "0") {
				return true
			}
		}
		return false
	}

	return (
		<div className={s.wrapper}>
			<div
				className={cn(s.title, {[s.disabled]: !active })}
				style={active ? styles : null}
				onClick={setActive}
				>
				{title}
				<div className={s.arrow}>›</div>
			</div>
			<div className={cn(s.content, {[s.last]: last})}>
				<div className={cn(s.tableRow, s.tableHead)}>
					{[...Array(4)].map((el, index) => {
						return <div
							className={cn(s.tableCell, s.headCell, {[s.first]: index === 0})}
							key={index}
							>
							{index !== 0 ? t(`work.obj${index}`) : ""}
						</div>
					})}
				</div>
				{data.map((rowData, rowIndex) => {
					return <div className={cn(s.tableRow, s.tableHead)} key={rowIndex}>
						{rowData.map((el, index) => {
							const percent = percents && percents[rowIndex][index-1]
							return <div
								className={cn(s.tableCell, {[s.first]: index === 0})}
								style={index === 0 ? styles : null}
								key={index}
								>
								{Array.isArray(el) ? (
									<>
										{el[0]}
										{el[1] && <span className={s.info}>
											{t(el[1])}
											{el[2] && <span> / {t(el[2])}</span>}
										</span>}
									</>) : (
									<>
										{!el && (
											<>
												{t("work.fourthGroup.totalEmis")}
												<span className={s.info}>
													{t("work.firstGroup.name5Info")}
												</span>
											</>
										)}
										{el}
									</>
									)}
									{(index !== 0 && percents) && (
										<span
											className={cn(
												s.percent,
												{
													[s.minus]: isMinus(percent),
													[s.zero]: isZero(percent)
												})
											}>
											<span>{isMinus(percent) ? "-" : "+"}</span>
											{isMinus(percent) ? isMinus(percent) : percent}%
										</span>
									)}
							</div>
						})}
					</div>
				})}
			</div>
		</div>
	)
}

export default ReportItem