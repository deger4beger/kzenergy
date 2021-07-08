import s from "./FirstGroupOnly.module.css"
import Table from "../../../../components/Table/Table"
import FirstGroupOnlyLogic from "./FirstGroupOnlyLogic"

const FirstGroupOnly = () => {
	const { first, second, third,
		names, data, helps } = FirstGroupOnlyLogic()

	return (
		<>
			<div className={s.wrapper}>
				<Table
					names={names}
					data={data}
					helps={helps}
				/>
			</div>
		</>
	)
}

export default FirstGroupOnly



