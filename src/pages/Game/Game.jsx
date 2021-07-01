import { useState } from "react"
import { useParams } from "react-router-dom"
import s from "./Game.module.css"
import { NotFound } from '../../components/NotFound/NotFound';

const Game = () => {
	const [ended, setEnded] = useState(false)
	const { gameMode } = useParams()


	switch(gameMode) {
		case "d":
		case "L":
			return <div>d</div>
		default:
			return <NotFound />
	}
}

export default Game