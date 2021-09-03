import { useTheme } from '../../../hooks/useTheme';
import { useState } from 'react';
import cn from "classnames"
import s from "./ArchiveItem.module.css"
import { MainButton } from '../../../components/Button/Button'
import excelIconSmallDark from "assets/excelIconSmallDark.png"
import excelIconSmallLight from "assets/excelIconSmallLight.png"
import { useTranslation } from 'react-i18next'
import fileSaver from "file-saver"

const ArchiveItem = ({user, date, index, excelUrl, children,
	isSameUser, gasType, padding=false, onUserClick}) => {
	const { t } = useTranslation()
	const [theme] = useTheme()
	const [active, setActive] = useState(false)

	const onExcelClick = (e) => {
		e.stopPropagation()
		fileSaver.saveAs(
  			excelUrl,
  			`Report (${date}).xlsx`
		)
	}
	const onHeaderClick = () => {
		children && setActive(!active)
	}

	const onUsernameClick = (e) => {
		e.stopPropagation()
		onUserClick()
	}

	return (
		<div className={s.wrapper}>
			<div
				className={cn(s.header, {[s.active]: active})}
				onClick={onHeaderClick}
				>
				<div className={s.left}>
					<div className={s.index}>{index}</div>
					<div className={s.info}>
						<div className={s.name}>
							<span className={s.nameItem} onClick={onUsernameClick}>{user}</span>
							{isSameUser && <span className={s.you}>({t("other.you")})</span>}
							{gasType && <span className={s.gasType}>{t(gasType)}</span>}
						</div>
						<div className={s.date}>
							{date}
						</div>
					</div>
				</div>
				<div className={s.right}>
					{excelUrl && <div className={s.excelButton}>
						<MainButton
							content={"Excel"}
							onClick={onExcelClick}
							isLoading={false}
							disabled={false}
							icon={theme === "dark" ? excelIconSmallDark : excelIconSmallLight}
							styles={{
								color: "var(--main)",
								width: "120px",
								height: "40px",
								backgroundColor: "var(--thirdBg)"
							}}
						/>
					</div>}
					{children && <div className={s.arrow}>›</div>}
				</div>
			</div>
			<div className={cn(s.content, {[s.padding]: padding})}>
				{children}
			</div>
		</div>
	)
}

export default ArchiveItem