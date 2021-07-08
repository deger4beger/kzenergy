import { ThemeProvider } from "react-switch-theme"
import { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import auth from "./store/authStore"
import App from "./App"
import { validateToken } from './helpers/helpers';
import { observer } from 'mobx-react-lite';

const AppContainer = () => {
	const history = useHistory()

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