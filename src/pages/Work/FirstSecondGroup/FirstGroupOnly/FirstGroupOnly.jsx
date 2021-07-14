import React, { useEffect } from 'react'
import FirstGroupOnlyLogic from "./FirstGroupOnlyLogic"
import work from "../../../../store/workFirstStore"
import auth from "../../../../store/authStore"
import { observer } from 'mobx-react-lite'
import FirstSecondTemplate from "../FirstSecondTemplate/FirstSecondTemplate"

const FirstGroupOnly = ({object}) => {
	const { data, onSubmit, errors, objData,
		resetObjData, resetData, resetError } = FirstGroupOnlyLogic()
	const isSameUser = auth.myData.fullName === work.workData?.user?.fullName

	useEffect(() => {
		work.getObjData(object)
		resetObjData(object)
		resetError({0: null, 1: null, 2: null})
	}, [object])

	useEffect(() => {
		resetData(work.initialValues)
	}, [work.workData])


	if (!work.workData || work.loading || !objData) return <div />
	return (
		<FirstSecondTemplate
			isFilledData={work.workData.date}
			isSameUser={isSameUser}
			fullName={work.workData.user?.fullName}
			date={work.workData.date?.split(" ").join(", ")}
			objData={objData}
			data={data}
			errors={errors}
			buttonContent={"work.button"}
			onButtonClick ={() => onSubmit(object)}
			isButtonLoading={work.loadingCreate}
		/>
	)
}

export default React.memo(observer(FirstGroupOnly))



