import { useState } from 'react';
import cn from "classnames"
import s from "./OneTwo.module.css"
import { useTranslation } from "react-i18next";
import ObjCard from "./ObjCard/ObjCard"

const OneTwo = () => {
	const { t, i18n } = useTranslation()
	const [selectedObj, setSelectedObj] = useState(null)
	const objects = [
		{image: null, info: "work.obj1"},
		{image: null, info: "work.obj2"},
		{image: null, info: "work.obj3"}
	]

	return (
		<>
			<div className={s.title}>

			</div>
			<div className={s.objCards}>
				{objects.map((obj, index) => {
					return <ObjCard
						key={index}
						image={obj.image}
						info={obj.info}
						active={null}
						onItemClick={null}
					/>
				})}
			</div>
		</>
	)
}

export default OneTwo

