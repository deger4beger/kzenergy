import { useState } from 'react';
import work from "../../../../store/workStore"

const FirstGroupOnlyLogic = () => {
	const [first, setFirst] = useState("")
	const [second, setSecond] = useState("")
	const [third, setThird] = useState("")
	const [objData, setObjData] = useState(null)


	const data = [
		[first, (e) => setFirst(e.currentTarget.value)],
		[second, (e) => setSecond(e.currentTarget.value)],
		[third, (e) => setThird(e.currentTarget.value)]
	]
	const firstObjData = {
		names: [
			["Vp", "1000*m^3"],
			["Vz", "1000*m^3"],
			["t", "hours"]
		],
		helps: [
			"Gas consumption volume",
			"Volume of injected gas",
			"Working hours"
		]
	}
	const secObjData = {
		names: [
			["Vp", "1000*m^3"],
			["E", "MW*h"],
			["t", "hours"]
		],
		helps: [
			"Gas consumption volume",
			"Generated electricity",
			"Working hours"
		]
	}
	const thirdObjData = {
		names: [
			["Vp", "1000*m^3"],
			["V", "ton"],
			["t", "hours"]
		],
		helps: [
			"Gas consumption volume",
			"Steam volume",
			"Working hours"
		]
	}

	const resetData = () => {
		setFirst("")
		setSecond("")
		setThird("")
	}

	const resetObjData = (object) => {
		if (object === "compressor") {
			setObjData(firstObjData)
			resetData()
		}
		if (object === "powerplant") {
			setObjData(secObjData)
			resetData()
		}
		if (object === "boiler") {
			setObjData(thirdObjData)
			resetData()
		}
	}

	const onSubmit = (object) => {
		if (object === "compressor") {
			work.createObjData(object, {
				gasConsumptionVolume: first,
				volumeOfInjectedGas: second,
				workingHours: third
			})
		}
		if (object === "powerplant") {
			work.createObjData(object, {
				gasConsumptionVolume: first,
				generatedElectricity: second,
				workingHours: third
			})
		}
		if (object === "boiler") {
			work.createObjData(object, {
				gasConsumptionVolume: first,
				steamVolume: second,
				workingHours: third
			})
		}
	}

	return {
		data, objData, onSubmit, resetObjData
	}
}

export default FirstGroupOnlyLogic



