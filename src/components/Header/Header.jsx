import { Link, useLocation } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next";
import cn from "classnames"
import auth from "../../store/authStore"
import s from "./Header.module.css"
import { MainButton } from '../Button/Button';
import logoIconDark from "assets/logoIconDark.png"
import logoIconWhite from "assets/logoIconWhite.png"
import Settings from "./Settings/Settings"
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
	const { t, i18n } = useTranslation()
	const [theme, setTheme] = useTheme()
	const url = useLocation().pathname.substr(1)

	const themeSwitch = () => {
		if (theme === "dark") {
			setTheme("light")
		} else {
			setTheme("dark")
		}
	}

	const changeLanguage = (language) => {
		// if (language === "ru") {
	 //  		document.documentElement.style.setProperty('--mainFont', "Jost")
	 //  	} else {
	 //  		document.documentElement.style.setProperty('--mainFont', "Josefin Sans")
	 //  	}
    	i18n.changeLanguage(language)
  	}

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.left}>
					<div>
						<Link to="/homepage" className={s.logo}>
							Sh
							<img
								src={theme === "dark" ? logoIconDark : logoIconWhite}
								alt=""
								className={s.logoIcon}/>
							qan
						</Link>
					</div>
					<Link to="/work" className={!auth.isAuth ? cn(s.route, s.disabled) : (
						(url === "work" || url === "work/scroll") ? cn(s.route, s.active) : s.route)}>
						<span>{t("header.route1")}</span>
					</Link>
					<Link to="/archive" className={!auth.isAuth ? cn(s.route, s.disabled) : (
						url === "archive" ? cn(s.route, s.active) : s.route)}>
						<span>{t("header.route2")}</span>
					</Link>
					<div className={s.route}>
						<span onClick={()=> window.open("https://vk.com/doc173450504_612526855", "_blank")}>
							{t("header.route3")}
						</span>
						<div className={s.routeLang}>
							<span onClick={()=> window.open("https://vk.com/doc173450504_612526833", "_blank")}>
								RU
							</span>
							<span onClick={()=> window.open("https://vk.com/doc173450504_612526878", "_blank")}>
								KZ
							</span>
						</div>
					</div>
				</div>
				<div className={s.right}>
					<div className={s.logBtn}>
						{!auth.isAuth ?
							(
								<Link className={s.link} to="/login">
									<MainButton
										content={t("login.login")}
										onClick={null}
									/>
								</Link>
							)
							: (
								<MainButton
									content={t("login.logout")}
									onClick={() => auth.logout()}
								/>
							)
						}
					</div>
					<Settings
						theme={theme}
						themeSwitch={themeSwitch}
						setLanguage={changeLanguage}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(Header)