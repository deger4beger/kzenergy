import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import s from "./SecGraph.module.css"
import { useTheme } from '../../../hooks/useTheme';
import store from "../../../store/homepageStore.js"
import OptionCard from '../../../components/OptionCard/OptionCard';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Preloader } from '../../../components/Preloader/Preloader';

const SecGraph = () => {
	const { t } = useTranslation()
	const [theme] = useTheme()
	const [mode, setMode] = useState("compressor")
	const modes = ["compressor", "powerplant", "boiler", "energy"]

	const osSetMode = (index) => {
		if (modes[index] === mode) return
		store.getHomepageData(null, null, modes[index], 1)
		setMode(modes[index])
	}

	return (
		<div className={s.wrapper}>
			<div className={s.settings}>
				<div className={s.left}>
					{[...Array(3)].map((el, index) => {
						return <OptionCard
							key={index}
							content={t(`homepage.obj${index + 1}`)}
							onClick={() => osSetMode(index)}
							active={mode === modes[index]}
							disabled={store.loading[1]}
						/>
					})}
				</div>
				<div className={s.right}>
					<OptionCard
						content={t("work.thirdGroup.type3")}
						onClick={() => osSetMode(3)}
						active={mode === modes[3]}
						disabled={store.loading[1]}
						color="var(--efficiency)"
						isSign
					/>
				</div>
			</div>
			{!store.loading[1] ? (
				<div className={s.chart}>
					<Line {...store.getChartTwoData(theme, mode, t)} />
				</div>
			) : <Preloader />}
		</div>
	)
}

export default observer(SecGraph)