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
import FirstGroupOnly from "./FirstGroupOnly/FirstGroupOnly"
import work from "../../../store/workStore"
import { Preloader } from '../../../components/Preloader/Preloader';

const FirstSecondGroup = ({role}) => {
	const [theme] = useTheme()
	const [selectedObj, setSelectedObj] = useState(null)
	const routes = ["compressor", "powerplant", "boiler"]


	const objects = [
		{image: [turbineDark, turbineWhite], info: "work.obj1"},
		{image: [stationDark, stationWhite], info: "work.obj2"},
		{image: [boilerDark, boilerWhite], info: "work.obj3"}
	]

	return (
		<>
			<div className={s.objCards}>
				{objects.map((obj, index) => {
					return <ObjCard
						key={index}
						image={theme === "dark" ? obj.image[0] : obj.image[1]}
						info={obj.info}
						active={routes[index] === selectedObj}
						onItemClick={() => setSelectedObj(routes[index])}
					/>
				})}
			</div>
			{work.loading && <Preloader />}
			{selectedObj && (role === "objWorker") && (
				<FirstGroupOnly object={selectedObj} />
			)}
		</>
	)
}

export default observer(FirstSecondGroup)

