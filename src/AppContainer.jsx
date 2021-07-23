import { ThemeProvider } from "react-switch-theme"
import { useEffect } from 'react'
import auth from "./store/authStore"
import App from "./App"
import { validateToken } from './helpers/helpers';
import { observer } from 'mobx-react-lite';

const AppContainer = () => {

	useEffect(() => {
		const myData = validateToken()
		if (myData) {
			auth.setMyData(myData, false)
			return
		}
		auth.logout()
	}, [])

	const colors = {
		light: {
		  	firstBg: "#ececed",
		  	secBg: "#E3E2E2",
		  	additional: "rgba(0, 0, 0, 0.2)",
		  	error: "#E93C3C",
		  	forText: "#565656FF",
		 	color: "black",
		 	main: "#378F57",
		 	mainDark: "#3B7F53",
		 	forBg: "#8BD4A8",
		 	selection: "#8BD4A8",
		 	forLinks: "#2A8CBF",
		 	pollutants: "#67A0CC",
		 	greenhouse: "#CC6363",
		 	efficiency: "#AEB253",
		 	emission: "#C29E50",
		 	gas: "#0EA8AD"
		},
		dark: {
		  	firstBg: "#141319", //  rgb(18, 18, 21)
		  	secBg: "#1C1A22", // 1C1A22
		  	additional: "#373737", // rgba(255, 255, 255, 0.2)
		  	error: "#DF5555",
		  	forText: "#CECECEFF",
		 	color: "#ececed",
		 	main: "#71D795", // #47DC7C
		 	mainDark: "#3B7F53",
		 	forBg: "#4A7E51", // #457E5E
		 	selection: "#4C9268", // #4C9268
		 	forLinks: "#3BA6DD",
		 	pollutants: "#90BFE3",
		 	greenhouse: "#DF8B8B",
		 	efficiency: "#D4D78D",
		 	emission: "#C29E50",
		 	gas: "#12C1C7"
		}
	}
	const activeMode = "dark"
	const offlineStorageKey = "colorScheme"

	if (auth.isAuth === undefined) {
		return <div className="loading">Loading...</div>
	}
	return (
		<ThemeProvider
			colors={colors}
			activeMode={activeMode}
			offlineStorageKey={offlineStorageKey}>
				<App />
		</ThemeProvider>
	)
}

export default observer(AppContainer)