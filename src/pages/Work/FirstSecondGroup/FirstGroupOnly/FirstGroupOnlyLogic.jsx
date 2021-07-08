import { useState } from 'react';
import s from "./FirstGroupOnly.module.css"
import Table from "../../../../components/Table/Table"

const FirstGroupOnlyLogic = () => {
	const [first, setFirst] = useState("")
	const [second, setSecond] = useState("")
	const [third, setThird] = useState("")

	const names = [
		["Vp", "1000 * m^3"],
		["Vz", "1000 * m^3"],
		["t", "hours"]
	]
	const data = [
		[first, (e) => setFirst(e.currentTarget.value)],
		[second, (e) => setSecond(e.currentTarget.value)],
		[third, (e) => setThird(e.currentTarget.value)]
	]
	const helps = [
		"Gas consumption volume",
		"Volume of injected gas",
		"Working hours"
	]

	return {
		first, second, third,
		names, data, helps
	}
}

export default FirstGroupOnlyLogic



