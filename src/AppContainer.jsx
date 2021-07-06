import { ThemeProvider } from "react-switch-theme"
import { useEffect, useState } from 'react'
import decode from "jwt-decode"
import auth from "./store/authStore"
import App from "./App"
import i18next from 'i18next';

const AppContainer = () => {

	const [lang, setLang] = useState(null)

	useEffect(() => {
		const myData = JSON.parse(localStorage.getItem("access"))
		if (myData) {
			const decodedToken = decode(myData.access)

			if (decodedToken.exp * 1000 < new Date().getTime()) return null

			auth.setMyData(myData, false)
		}
	}, [])

	const colors = {
		light: {
		  	firstBg: "rgb(240, 242, 245)",
		  	secBg: "#E8E8E8",
		  	additional: "rgba(0, 0, 0, 0.2)",
		  	error: "#E93C3C",
		  	forText: "#565656FF",
		 	color: "black",
		 	main: "#378F57",
		 	selection: "#8BD4A8",
		 	forLinks: "#2A8CBF"
		},
		dark: {
		  	firstBg: "rgb(18, 18, 21)",
		  	secBg: "#1C1A22",
		  	additional: "rgba(255, 255, 255, 0.2)",
		  	error: "#EB7E7E",
		  	forText: "#CECECEFF",
		 	color: "#ececed",
		 	main: "#47DC7C",
		 	selection: "#398055",
		 	forLinks: "#3BA6DD"
		}
	}
	const activeMode = "dark"
	const offlineStorageKey = "colorScheme"


	return (
		<ThemeProvider
			colors={colors}
			activeMode={activeMode}
			offlineStorageKey={offlineStorageKey}>
				<App
					// setLanguage={setLanguage}
					// lang={lang}
				/>
		</ThemeProvider>
	)
}

export default AppContainer