import { useState } from 'react';
import work from "../../../../store/workSecondStore"
import { hasErrorTableValue } from '../../../../validators/Validator';

const SecondGroupOnlyLogic = () => {
	const [first, setFirst] = useState("")
	const [second, setSecond] = useState("")
	const [third, setThird] = useState("")
	const [fourth, setFourth] = useState("")
	const [fifth, setFifth] = useState("")
	const [sixth, setSixth] = useState("")
	const [seventh, setSeventh] = useState("")
	const [eighth, setEighth] = useState("")
	const [errors, setErrors] = useState({
		0: null,
		1: null,
		2: null,
		3: null,
		4: null,
		5: null,
		6: null,
		7: null
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
	const onFourthChange = (e) => {
		errors[3] && resetError({3: null})
		setFourth(e.currentTarget.value)
	}
	const onFifthChange = (e) => {
		errors[4] && resetError({4: null})
		setFifth(e.currentTarget.value)
	}
	const onSixthChange = (e) => {
		errors[5] && resetError({5: null})
		setSixth(e.currentTarget.value)
	}
	const onSeventhChange = (e) => {
		errors[6] && resetError({6: null})
		setSeventh(e.currentTarget.value)
	}
	const onEighthChange = (e) => {
		errors[7] && resetError({7: null})
		setEighth(e.currentTarget.value)
	}

	const objData = {
		names: [
			["work.secondGroup.name1", "work.secondGroup.info1"],
			["work.secondGroup.name2", "work.secondGroup.info1"],
			["work.secondGroup.name3", "work.secondGroup.info1"],
			["work.secondGroup.name4", "work.secondGroup.info2"],
			["work.secondGroup.name5", "work.secondGroup.info3"],
			["work.secondGroup.name6"],
			["work.secondGroup.name7"],
			["work.secondGroup.name8", "work.secondGroup.info4"],
		],
		helps: [
			"work.secondGroup.help1",
			"work.secondGroup.help2",
			"work.secondGroup.help3",
			"work.secondGroup.help4",
			"work.secondGroup.help5",
			"work.secondGroup.help6",
			"work.secondGroup.help7",
			"work.secondGroup.help8"
		]
	}
	const data = [
		[first, onFirstChange],
		[second, onSecondChange],
		[third, onThirdChange],
		[fourth, onFourthChange],
		[fifth, onFifthChange],
		[sixth, onSixthChange],
		[seventh, onSeventhChange],
		[eighth, onEighthChange]
	]

	const resetData = (initialValues=[]) => {
		setFirst(initialValues[0] ? initialValues[0] : "")
		setSecond(initialValues[1] ? initialValues[1] : "")
		setThird(initialValues[2] ? initialValues[2] : "")
		setFourth(initialValues[3] ? initialValues[3] : "")
		setFifth(initialValues[4] ? initialValues[4] : "")
		setSixth(initialValues[5] ? initialValues[5] : "")
		setSeventh(initialValues[6] ? initialValues[6] : "")
		setEighth(initialValues[7] ? initialValues[7] : "")
	}

	// const resetObjData = (object) => {
	// 	if (object === "compressor") {
	// 		setObjData(firstObjData)
	// 		resetData()
	// 	}
	// 	if (object === "powerplant") {
	// 		setObjData(secObjData)
	// 		resetData()
	// 	}
	// 	if (object === "boiler") {
	// 		setObjData(thirdObjData)
	// 		resetData()
	// 	}
	// }

	const resetError = (errors) => {
		setErrors(prev => ({
			...prev,
			...errors
		}))
	}

	const onSubmit = (gasName) => {
		let hasError = false
		if (hasErrorTableValue(first)) {
			resetError({0: hasErrorTableValue(first)})
			hasError = true
		}
		if (hasErrorTableValue(second)) {
			resetError({1: hasErrorTableValue(second)})
			hasError = true
		}
		if (hasErrorTableValue(third)) {
			resetError({2: hasErrorTableValue(third)})
			hasError = true
		}
		if (hasErrorTableValue(fourth)) {
			resetError({3: hasErrorTableValue(fourth)})
			hasError = true
		}
		if (hasErrorTableValue(fifth)) {
			resetError({4: hasErrorTableValue(fifth)})
			hasError = true
		}
		if (hasErrorTableValue(sixth)) {
			resetError({5: hasErrorTableValue(sixth)})
			hasError = true
		}
		if (hasErrorTableValue(seventh)) {
			resetError({6: hasErrorTableValue(seventh)})
			hasError = true
		}
		if (hasErrorTableValue(eighth)) {
			resetError({7: hasErrorTableValue(eighth)})
			hasError = true
		}
		if (hasError) return
		if (gasName === "sweetGas") {
			work.createGasData({
				nitrogen: first,
				sulfur: second,
				carbon: third,
				density: fourth,
				CO2EmissionFactor: fifth,
				CH4SpecificFactor: sixth,
				N2OSpecificFactor: seventh,
				LowerHeatCombustion: eighth,
				gasName
			})
		}
	}

	return {
		data, objData, onSubmit, resetData, errors
	}
}

export default SecondGroupOnlyLogic



