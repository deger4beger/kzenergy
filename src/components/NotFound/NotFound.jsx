import s from "./NotFound.module.css"
import { useTranslation } from "react-i18next";

export function NotFound() {
	const { t, i18n } = useTranslation();
    return (
    	<div className={s.wrapper}>
    		{t("other.notFound")}
    	</div>
 	);
}