import React, { useEffect } from 'react'
import FirstGroupOnlyLogic from "./FirstGroupOnlyLogic"
import work from "../../../../store/workFirstStore"
import auth from "../../../../store/authStore"
import { observer } from 'mobx-react-lite'
import FirstSecondTemplate from "../FirstSecondTemplate/FirstSecondTemplate"

const FirstGroupOnly = ({object}) => {
	const { data, onSubmit, errors, objData, modalActive, setModalActive, onSubmitModal,
		resetObjData, resetData, fileUploaded, setFileUploaded } = FirstGroupOnlyLogic()
	const refusalData = work.workData?.refusalData

	useEffect(() => {
		work.getObjData(object)
		resetObjData(object)
		return () => {
			work.setWorkData(null)
		}
	}, [object])

	useEffect(() => {
		resetData(work.initialValues)
	}, [work.workData])

	useEffect(() => {
		if (fileUploaded[0]) {
			resetData(fileUploaded)
		}
	}, fileUploaded)

	setTimeout(() => {
		if (fileUploaded[0]) {
			setFileUploaded(Array(3))
		}
	}, 1000)

	if (!work.workData || work.loading || !objData) return <div />
	return (
		<FirstSecondTemplate
			isFilledData={work.workData.date}
			isRejectedData={refusalData?.date}
			isSameUser={auth.myData.id === work.workData?.user?.id}
			fullName={work.workData.user ? work.workData.user.fullName : (
				refusalData?.date ? refusalData?.user.fullName : null
			)}
			reason={refusalData?.text}
			date={work.workData.date ? work.workData.date.split(" ").join(", ") : (
				refusalData?.date ? refusalData?.date.split(" ").join(", ") : null
			)}
			objData={objData}
			data={data}
			errors={errors}
			buttonContent={"work.button"}
			onButtonClick={onSubmit}
			isButtonLoading={work.loadingCreate}
			modalActive={modalActive}
			setModalActive={setModalActive}
			onSubmitModal={() => onSubmitModal(object, refusalData?.date)}
			setFileUploaded={setFileUploaded}
			blink={fileUploaded.filter(el => el).length}
		/>
	)
}

export default React.memo(observer(FirstGroupOnly))



