import { useState } from "react"
import s from "./Work.module.css"
import { NotFound } from '../../components/NotFound/NotFound';
import OneTwo from "./OneTwo/OneTwo"

const Work = () => {

	switch("d") {
		case "d":
		case "L":
			return <OneTwo />
		default:
			return <NotFound />
	}
}

export default Work