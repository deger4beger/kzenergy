import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from "classnames"
import s from "./MainGraph.module.css"
import { colors } from '../../../store/staticObjects';
import { useTranslation } from 'react-i18next';
import OptionCard from "../../../components/OptionCard/OptionCard"
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../../hooks/useTheme';
import store from "../../../store/homepageStore.js"
import { Preloader } from '../../../components/Preloader/Preloader';

const MainGraph = () => {
	const [theme] = useTheme()
	const { t } = useTranslation()

	const [range, setRange] = useState("all")
	const [type, setType] = useState("pollutants")
	const [obj, setObj] = useState("compressor")

	useEffect(() => {
		store.getHomepageData(range, type, "compressor")
	}, [])

	const valuesRange = ["all", "last"]
	const valuesType = ["pollutants", "grhs", "energy"]
	const objectsGraph = {
		"compressor": 1,
		"powerplant": 2,
		"boiler": 3
	}

	const onSetRange = (value) => {
		if (value === range) return
		store.getHomepageData(value, type)
		setRange(value)
	}

	const onSetType = (value) => {
		if (value === type) return
		store.getHomepageData(range, value)
		setType(value)
	}

	const onSetObject = (index) => {
		const data = store.workData.graph1.order[index]
		if (obj === store.workData.graph1.order[index]) return
		setObj(data)
	}

	if (!store.workData) return <Preloader />
	return (
		<div className={s.wrapper}>
			<div className={s.select}>
				<div className={s.leftBlock}>
					{[...Array(2)].map((el, index) => {
						return <OptionCard
							key={index}
							content={t(`homepage.option${index + 1}`)}
							onClick={() => onSetRange(valuesRange[index])}
							active={range === valuesRange[index]}
							disabled={store.loading[0]}
						/>
					})}
				</div>
				<div className={s.rightBlock}>
					{[...Array(3)].map((el, index) => {
						return <OptionCard
							key={index}
							content={t(`work.thirdGroup.type${index + 1}`)}
							onClick={() => onSetType(valuesType[index])}
							active={type === valuesType[index]}
							color={colors[index]}
							disabled={store.loading[0]}
							isSign
						/>
					})}
				</div>
			</div>
			{!store.loading[0] ? (
				<div className={s.graph}>
					<div className={s.arrow}>></div>
					<div className={cn(s.dimension, {[s.energy]: type === "energy"})}>
						({type !== "energy" ? t("work.firstGroup.name5Info") : (
							t("work.firstGroup.help6")
						)})
					</div>
					<div className={s.leftArea}>
						{colors.map((color, index) => {
							const objects = store.workData.graph1.order
							return <div className={s.itemBlock} key={index}>
								<div
									className={cn(s.sign, {[s.active]: objects[index] === obj})}
									style={{
										backgroundColor: colors[valuesType.indexOf(type)]
									}}
									onClick={() => onSetObject(index)}
								/>
								<div className={s.value}>{store.workData.graph1[objects[index]].total}</div>
								<div className={s.object}>{t(`homepage.obj${objectsGraph[objects[index]]}`)}</div>
							</div>
						})}
					</div>
					<div className={s.rightArea}>
						{type !== "energy" && <div className={s.chart}>
							<Doughnut {...store.getChartData(type, obj, theme)} />
						</div>}
					</div>
				</div>
			) : <Preloader />}
		</div>
	)
}

export default observer(MainGraph)