import cn from "classnames"
import s from "./Button.module.css"
import loadingIcon from "../../assets/loadingIcon.svg"
import loadingIconWhite from "../../assets/loadingIconWhite.svg"
import { useTheme } from '../../hooks/useTheme';

export const MainButton = ({content, icon, onClick, isLoading, disabled, styles}) => {
	const [theme] = useTheme()
	return (
		<div
			className={disabled ? cn(s.loginButton, s.disabled) : s.loginButton}
		    onClick={isLoading ? undefined : disabled ? undefined : onClick}
		    style={styles} >
			    {icon && (
			    	<img src={icon}
			    		className={isLoading ? cn(s.icon, s.loading) : s.icon}
			    		alt="#" />
			    	)
			    }
			    {isLoading && (
			    	<img src={theme === "dark" ? loadingIconWhite : loadingIcon}
			    		className={s.loadingIcon}
			    		alt="#" />
			    	)
			    }
			    <div className={isLoading ? cn(s.content, s.loading) : s.content}>
			    	{content}
			    </div>
		</div>
	)
}