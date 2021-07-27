import { useTheme } from '../../../hooks/useTheme';
import { useState } from 'react';
import cn from "classnames"
import s from "./ArchiveItem.module.css"
import { MainButton } from '../../../components/Button/Button'
import excelIconSmallDark from "assets/excelIconSmallDark.png"
import excelIconSmallLight from "assets/excelIconSmallLight.png"

const ArchiveItem = ({user, date, index, excelUrl, children, isButton=true}) => {
	const [theme] = useTheme()
	const [active, setActive] = useState(false)

	const onExcelClick = (e) => {
		e.stopPropagation()
		return void 0
	}
	const onHeaderClick = () => {
		children && setActive(!active)
	}

	return (
		<div className={s.wrapper}>
			<div
				className={cn(s.header, {[s.active]: active})}
				onClick={onHeaderClick}
				>
				<div className={s.left}>
					<div className={s.index}>1</div>
					<div className={s.info}>
						<div className={s.name}>
							Deger Beger Miningovich
						</div>
						<div className={s.date}>
							2020-19-21
						</div>
					</div>
				</div>
				<div className={s.right}>
					{isButton && <div className={s.excelButton}>
						<MainButton
							content={"Excel"}
							onClick={onExcelClick}
							isLoading={false}
							disabled={false}
							icon={theme === "dark" ? excelIconSmallDark : excelIconSmallLight}
							styles={{
								color: "var(--main)",
								width: "120px",
								height: "40px"
							}}
						/>
					</div>}
					{children && <div className={s.arrow}>›</div>}
				</div>
			</div>
			<div className={s.content}>
				{children}
			</div>
		</div>
	)
}

export default ArchiveItem