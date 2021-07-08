import { useState } from 'react';
import s from "./OneTwo.module.css"
import { useTheme } from '../../../hooks/useTheme';
import ObjCard from "./ObjCard/ObjCard"
import boilerDark from "assets/work/boilerDark.png"
import boilerWhite from "assets/work/boilerWhite.png"
import turbineDark from "assets/work/turbineDark.png"
import turbineWhite from "assets/work/turbineWhite.png"
import stationDark from "assets/work/stationDark.png"
import stationWhite from "assets/work/stationWhite.png"

const OneTwo = () => {
	const [theme] = useTheme()
	const [selectedObj, setSelectedObj] = useState(null)


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
						active={index === selectedObj}
						onItemClick={() => setSelectedObj(index)}
					/>
				})}
			</div>
		</>
	)
}

export default OneTwo

