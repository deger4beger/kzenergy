import React from 'react';
import cn from "classnames"
import s from "./Table.module.css"
import { useTranslation } from 'react-i18next';

const Table = React.memo(({names, data, helps, disabled, errors}) => {
	const { t } = useTranslation()

	return (
		<div className={s.columns}>
			{names.map((name, index) => {
				return <div className={s.column} key={index}>
					<div className={((index + 1 === names.length) || index === 3) ?
							cn(s.upper, s.last) : s.upper}>
						<span className={s.first}>{t(name[0])},</span>
						<span className={s.second}>{t(name[1])}</span>
						<div className={s.helpIcon}>?</div>
					</div>
					<div className={disabled && s.disabled}>
						<input
							className={((index + 1 === names.length) || index === 3) ?
								cn(s.lower, s.last) : s.lower}
							onChange={data[index][1]}
							value={data[index][0]}
							placeholder={t("other.tablePlaceholder")}
							onKeyPress={(event) => {
						        if (!/[0-9]/.test(event.key)) {
						          	event.preventDefault();
						        }
						    }}
						/>
					</div>
					<div className={s.help}>{t(helps[index])}</div>
					<div className={s.error}>{t(errors[index])}</div>
				</div>
			})}
		</div>
	)
})

export default Table