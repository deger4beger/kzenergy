import cn from "classnames"
import s from "./Table.module.css"

const Table = ({names, data, helps}) => {


	return (
		<div className={s.columns}>
			{names.map((name, index) => {
				return <div className={s.column}>
					<div className={(index + 1) === names.length ? cn(s.upper, s.last) : s.upper}>
						<span className={s.first}>{name[0]},</span>
						<span className={s.second}>{name[1]}</span>
					</div>
					<input
						className={(index + 1) === names.length ? cn(s.lower, s.last) : s.lower}
						onChange={data[index][1]}
						value={data[index][0]}
						placeholder="Type values"
					/>
					<div className={s.help}>{helps[index]}</div>
				</div>
			})}
		</div>
	)
}

export default Table