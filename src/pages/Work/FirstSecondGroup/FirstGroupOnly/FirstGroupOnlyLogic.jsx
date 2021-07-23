import { useState } from 'react';
import work from "../../../../store/workFirstStore"
import { hasErrorTableValue } from '../../../../validators/Validator';

const FirstGroupOnlyLogic = () => {
	const [first, setFirst] = useState("")
	const [second, setSecond] = useState("")
	const [third, setThird] = useState("")
	const [objData, setObjData] = useState(null)
	const [modalActive, setModalActive] = useState(false)
	const [errors, setErrors] = useState({
		0: null,
		1: null,
		2: null
	})

	const onFirstChange = (e) => {
		errors[0] && resetError({0: null})
		setFirst(e.currentTarget.value)
	}
	const onSecondChange = (e) => {
		errors[1] && resetError({1: null})
		setSecond(e.currentTarget.value)
	}
	const onThirdChange = (e) => {
		errors[2] && resetError({2: null})
		setThird(e.currentTarget.value)
	}

	const data = [
		[first, onFirstChange],
		[second, onSecondChange],
		[third, onThirdChange]
	]
	const firstObjData = {
		names: [
			["work.firstGroup.name1", "work.firstGroup.name1Info"],
			["work.firstGroup.name2", "work.firstGroup.name2Info"],
			["work.firstGroup.name3", "work.firstGroup.name3Info"]
		],
		helps: [
			"work.firstGroup.help1",
			"work.firstGroup.help4",
			"work.firstGroup.help2"
		]
	}
	const secObjData = {
		names: [
			["work.firstGroup.name1", "work.firstGroup.name1Info"],
			["work.firstGroup.name4", "work.firstGroup.name4Info"],
			["work.firstGroup.name3", "work.firstGroup.name3Info"]
		],
		helps: [
			"work.firstGroup.help1",
			"work.firstGroup.help3",
			"work.firstGroup.help2"
		]
	}
	const thirdObjData = {
		names: [
			["work.firstGroup.name1", "work.firstGroup.name1Info"],
			["work.firstGroup.name5", "work.firstGroup.name5Info"],
			["work.firstGroup.name3", "work.firstGroup.name3Info"]
		],
		helps: [
			"work.firstGroup.help1",
			"work.firstGroup.help5",
			"work.firstGroup.help2"
		]
	}

	const resetData = (initialValues=[]) => {
		initialValues[0] && setFirst(initialValues[0])
		initialValues[1] && setSecond(initialValues[1])
		initialValues[2] && setThird(initialValues[2])
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

	const resetError = (errors) => {
		setErrors(prev => ({
			...prev,
			...errors
		}))
	}

	const onSubmit = () => {
		let hasError = false
		for (let [index, value] of data.entries()) {
			if (hasErrorTableValue(value[0])) {
				resetError({[index]: hasErrorTableValue(value[0])})
				hasError = true
			}
		}
		if (hasError) return
		setModalActive(true)
	}

	const onSubmitModal = (object, update=false) => {
		let payload
		if (object === "compressor") {
			payload = {
				gasConsumptionVolume: first,
				volumeOfInjectedGas: second,
				workingHours: third
			}
		}
		if (object === "powerplant") {
			payload = {
				gasConsumptionVolume: first,
				generatedElectricity: second,
				workingHours: third
			}
		}
		if (object === "boiler") {
			payload = {
				gasConsumptionVolume: first,
				steamVolume: second,
				workingHours: third
			}
		}
		update ? work.updateObjData(object, payload) : work.createObjData(object, payload)
		setModalActive(false)
	}

	return {
		data, objData, onSubmit, onSubmitModal, resetObjData, resetData, errors,
		firstObjData, secObjData, thirdObjData, modalActive, setModalActive
	}
}

export default FirstGroupOnlyLogic



