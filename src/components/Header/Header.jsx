import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next";
import auth from "../../store/authStore"
import s from "./Header.module.css"
import { MainButton } from '../Button/Button';
import logoIconDark from "assets/logoIconDark.png"
import logoIconWhite from "assets/logoIconWhite.png"
import Settings from "./Settings/Settings"
import { getThemeIcon } from '../../helpers/helpers';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
	const { t, i18n } = useTranslation();
	const [theme, setTheme] = useTheme()

	const themeSwitch = () => {
		if (theme === "dark") {
			setTheme("light")
		} else {
			setTheme("dark")
		}
	}

	const changeLanguage = (language) => {
    	i18n.changeLanguage(language);
    	console.log(i18n)
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
					<Link to="/profile" className={s.route}>
						{t("header.route1")}
					</Link>
					<Link to="/about" className={s.route}>
						{t("header.route2")}
					</Link>
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
						// myLanguage={lang}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(Header)