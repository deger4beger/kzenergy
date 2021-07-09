import React, { useEffect } from 'react';
import s from "./FirstGroupOnly.module.css"
import Table from "../../../../components/Table/Table"
import FirstGroupOnlyLogic from "./FirstGroupOnlyLogic"
import work from "../../../../store/workStore"
import { observer } from 'mobx-react-lite';
import { MainButton } from '../../../../components/Button/Button';

const FirstGroupOnly = ({object}) => {
	const { data, onSubmit,
		objData, resetObjData } = FirstGroupOnlyLogic()

	useEffect(() => {
		work.getObjData(object)
		resetObjData(object)
	}, [object])


	if (!work.workData || work.loading || !objData) return <div />
	return (
		<>
			<div className={s.wrapper}>
				<Table {...objData} data={data} />
			</div>
			<div className={s.button}>
				<MainButton
					content={"Send data to mining department"}
					onClick={() => onSubmit(object)}
					isLoading={false}
					disabled={false}
					styles={{
						padding: "3px 14px",
						fontSize: "var(--fsz24)",
						width: "620px"
					}}
				/>
			</div>
		</>
	)
}

export default React.memo(observer(FirstGroupOnly))



