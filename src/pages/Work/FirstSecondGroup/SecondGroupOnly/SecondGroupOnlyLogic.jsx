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
	const [modalActive, setModalActive] = useState(false)
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
		initialValues[0] && setFirst(initialValues[0])
		initialValues[1] && setSecond(initialValues[1])
		initialValues[2] && setThird(initialValues[2])
		initialValues[3] && setFourth(initialValues[3])
		initialValues[4] && setFifth(initialValues[4])
		initialValues[5] && setSixth(initialValues[5])
		initialValues[6] && setSeventh(initialValues[6])
		initialValues[7] && setEighth(initialValues[7])
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

	const fillGostData = () => {
		resetData([null, null, null, "0.766", "57.96", "4", "1", "45.71"])
		resetError({3: null, 4: null, 5: null, 6: null, 7:null})
	}

	const onSubmitModal = (gasName, update=false) => {
		if (gasName === "sweetGas") {
			let payload = {
				nitrogen: first,
				sulfur: second,
				carbon: third,
				density: fourth,
				CO2EmissionFactor: fifth,
				CH4SpecificFactor: sixth,
				N2OSpecificFactor: seventh,
				LowerHeatCombustion: eighth,
				gasName
			}
			update ? work.updateGasData(payload) : work.createGasData(payload)
		}
		setModalActive(false)
	}

	return {
		data, objData, onSubmit, resetData, errors, modalActive, setModalActive, onSubmitModal, fillGostData
	}
}

export default SecondGroupOnlyLogic



