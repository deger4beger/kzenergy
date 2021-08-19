import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import s from "./FirstSecondGroup.module.css"
import { useTheme } from '../../../hooks/useTheme';
import ObjCard from "./ObjCard/ObjCard"
import boilerDark from "assets/work/boilerDark.png"
import boilerWhite from "assets/work/boilerWhite.png"
import turbineDark from "assets/work/turbineDark.png"
import turbineWhite from "assets/work/turbineWhite.png"
import stationDark from "assets/work/stationDark.png"
import stationWhite from "assets/work/stationWhite.png"
import purifiedGasWhite from "assets/work/purifiedGasWhite.png"
import purifiedGasDark from "assets/work/purifiedGasDark.png"
import FirstGroupOnly from "./FirstGroupOnly/FirstGroupOnly"
import SecondGroupOnly from "./SecondGroupOnly/SecondGroupOnly"
import auth from "../../../store/authStore"
import workFirst from "../../../store/workFirstStore"
import workSecond from "../../../store/workSecondStore"
import { Preloader } from '../../../components/Preloader/Preloader';

const FirstSecondGroup = ({role}) => {
	const [theme] = useTheme()
	const [selectedObj] = useState(
		auth.myData.role === "chemical" ? "sweetGas" : auth.myData.role
	)
	const routesObj = ["compressor", "powerplant", "boiler"]
	const routesChem = ["sweetGas"]
	const isObjWorker = role === routesObj[0] || role === routesObj[1] || role === routesObj[2]

	const objectsObj = [
		{image: [turbineDark, turbineWhite], info: "work.obj1"},
		{image: [stationDark, stationWhite], info: "work.obj2"},
		{image: [boilerDark, boilerWhite], info: "work.obj3"}
	]
	const objectsChem = [
		{image: [purifiedGasDark, purifiedGasWhite], info: "work.obj4"}
	]

	return (
		<>
			<div className={s.objCards}>
				{isObjWorker ? objectsObj.map((obj, index) => {
					return <ObjCard
						key={index}
						image={theme === "dark" ? obj.image[0] : obj.image[1]}
						info={obj.info}
						active={routesObj[index] === selectedObj}
						disabled={!(role === routesObj[index])}
					/>
				}) : objectsChem.map((obj, index) => {
					return <ObjCard
						key={index}
						image={theme === "dark" ? obj.image[0] : obj.image[1]}
						info={obj.info}
						active={routesChem[index] === selectedObj}
					/>
				})}
			</div>
			{(workFirst.loading || workSecond.loading) && <Preloader />}
			{selectedObj && isObjWorker && (
				<FirstGroupOnly object={selectedObj} />
			)}
			{selectedObj && (role === "chemical") && (
				<SecondGroupOnly gas={selectedObj} />
			)}
		</>
	)
}

export default observer(FirstSecondGroup)

