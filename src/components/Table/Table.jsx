import React from 'react';
import cn from "classnames"
import s from "./Table.module.css"
import { useTranslation } from 'react-i18next';

const Table = React.memo(({names, data, helps, disabled, errors, colors=[], blink}) => {
	const { t } = useTranslation()

	return (
		<div className={s.columns}>
			{names.map((name, index) => {
				return <div className={s.column} key={index}>
					<div className={s.upper}>
						<span className={s.first}>{t(name[0])}{name[1] && ","}</span>
						<span className={s.second}>{t(name[1])}</span>
						{helps[index] && <div className={s.helpIcon}>?</div> }
						{colors[index] && <div className={s.colors}>
							{colors[index][0] && <div className={s.color1}><div className={s.innerColor} /></div> }
							{colors[index][1] && <div className={s.color2}><div className={s.innerColor} /></div> }
							{colors[index][2] && <div className={s.color3}><div className={s.innerColor} /></div> }
						</div>}
					</div>
					<div className={disabled && s.disabled}>
						<input
							className={cn(s.lower, {
								[s.blink]: index < blink
							})}
							onChange={data[index][1]}
							value={data[index][0]}
							placeholder={t("other.tablePlaceholder")}
							onKeyPress={(event) => {
						        if (!/[0-9.]/.test(event.key)) {
						          	event.preventDefault()
						        }
						    }}
						/>
					</div>
					{helps[index] && <div className={s.help}>{t(helps[index])}</div> }
					<div className={s.error}>{t(errors[index])}</div>
				</div>
			})}
		</div>
	)
})

export default Table