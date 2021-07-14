import s from "./Preloader.module.css"
import preloaderLight from "assets/preloaderLight.svg"
import preloaderDark from "assets/preloaderDark.svg"
import { useTheme } from '../../hooks/useTheme';

export function Preloader() {
	const [theme] = useTheme()
    return (
    	<div className={s.wrapper}>
    		<img src={theme === "light" ? preloaderLight : preloaderDark} alt="#" className={s.preloader}/>
    	</div>
 	);
}