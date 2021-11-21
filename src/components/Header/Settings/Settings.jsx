import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import cn from "classnames"
import s from "./Settings.module.css"
import settingsIconDark from "assets/settingsIconDark.png"
import settingsIconWhite from "assets/settingsIconWhite.png"
import themeIconDark from "assets/themeIconDark.png"
import langIconDark from "assets/langIconDark.png"
import themeIconWhite from "assets/themeIconWhite.png"
import langIconWhite from "assets/langIconWhite.png"

const Settings = ({theme, themeSwitch, setLanguage}) => {
	const { t, i18n } = useTranslation()
	const [settingsActive, setSettingsActive] = useState(false)

	const localMiddleware = (func, lang=false) => {
		lang && localStorage.setItem("language", lang)
		func && func()
		setSettingsActive(false)
	}

	return (
		<div className={s.settingsBlock}>
			<img
				src={theme === "dark" ? settingsIconDark : settingsIconWhite}
				alt=""
				className={settingsActive ? s.settingsIcon : cn(s.settingsIcon, s.active)}
				onClick={() => setSettingsActive(!settingsActive)}
			/>
			<div className={settingsActive ? cn(s.dropdown, s.active) : s.dropdown}>
				<div className={s.menuItems}>
					<p
						className={s.menuItem}
						onClick={() => localMiddleware(themeSwitch)}>
						<img
							src={theme === "dark" ? themeIconDark : themeIconWhite}
							alt=""
						/>
						<span>{t("header.switchTheme")}</span>
					</p>
					<p className={s.menuItem}>
						<img
							src={theme === "dark" ? langIconDark : langIconWhite}
							alt=""
						/>
						<span
							className={i18n.language === "en" ? cn(s.lang, s.active) : s.lang}
							onClick={() => localMiddleware(() => setLanguage("en"))}>
							EN
						</span>
						<span
							className={i18n.language === "kz" ? cn(s.lang, s.active) : s.lang}
							onClick={() => localMiddleware(() => setLanguage("kz"))}>
							KZ
						</span>
						<span
							className={i18n.language === "ru" ? cn(s.lang, s.active) : s.lang}
							onClick={() => localMiddleware(() => setLanguage("ru"))}>
							RU
						</span>
					</p>
					<div className={s.info}
						onClick={() => localMiddleware(()=> window.open("https://vk.com/doc173450504_612526855", "_blank"))}>
						{t("header.optionInfo")}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings