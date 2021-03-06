import s from "./CornerMenu.module.css"
import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from "react-scroll"
import { useThrottle } from '../../hooks/useThrottle';

const CornerMenu = React.memo(() => {
	const [scrollActive, setScrollActive] = useState(false)

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
   		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const handleScroll = useThrottle(() => {
		console.log("1")
		if (window.pageYOffset > 200) {
			setScrollActive(true)
		} else {
			setScrollActive(false)
		}
	}, 1000)

	return (
		<div className={s.wrapper}>
			{scrollActive && <div
				className={s.scroll}
				onClick={() => scroll.scrollToTop({duration: 300})}
				>
				›
			</div>}
		</div>
	)
})

export default CornerMenu