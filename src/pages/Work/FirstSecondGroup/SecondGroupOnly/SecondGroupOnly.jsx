import React, { useEffect } from 'react'
import SecondGroupOnlyLogic from "./SecondGroupOnlyLogic"
import work from "../../../../store/workSecondStore"
import auth from "../../../../store/authStore"
import { observer } from 'mobx-react-lite'
import FirstSecondTemplate from "../FirstSecondTemplate/FirstSecondTemplate"

const SecondGroupOnly = ({gas}) => {
	const { data, onSubmit, errors, objData, resetData } = SecondGroupOnlyLogic()
	const isSameUser = auth.myData.fullName === work.workData?.user?.fullName

	useEffect(() => {
		work.getGasData(gas)
		// resetObjData(gas)
		// resetError({0: null, 1: null, 2: null})
		return () => {
			work.setWorkData(null)
		}
	}, [gas])

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
			onButtonClick ={() => onSubmit(gas)}
			isButtonLoading={work.loadingCreate}
		/>
	)
}

export default React.memo(observer(SecondGroupOnly))



