import s from "./NotFound.module.css"
import i18next from 'i18next';

export function NotFound() {
    return (
    	<div className={s.wrapper}>
    		{i18next.t("notFound")}
    	</div>
 	);
}