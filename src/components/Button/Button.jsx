import cn from "classnames"
import s from "./Button.module.css"
import loadingIcon from "../../assets/loadingIcon.svg"
import loadingIconWhite from "../../assets/loadingIconWhite.svg"
import { useTheme } from '../../hooks/useTheme';

export const MainButton = ({content, icon, onClick, isLoading, disabled, styles}) => {
	const [theme] = useTheme()
	return (
		<div
			className={cn(s.loginButton, {[s.disabled]: disabled, [s.loadingBtn]: isLoading})}
		    onClick={isLoading ? undefined : disabled ? undefined : onClick}
		    style={styles} >
			    {icon && (
			    	<img src={icon}
			    		className={cn(s.icon, {[s.loading]: isLoading})}
			    		alt="#" />
			    	)
			    }
			    {isLoading && (
			    	<img src={theme === "dark" ? loadingIconWhite : loadingIcon}
			    		className={s.loadingIcon}
			    		alt="#" />
			    	)
			    }
			    <div className={cn(s.content, {[s.loading]: isLoading})}>
			    	{content}
			    </div>
		</div>
	)
}