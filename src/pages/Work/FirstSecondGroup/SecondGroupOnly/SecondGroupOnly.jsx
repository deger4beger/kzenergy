import React, { useEffect } from 'react'
import SecondGroupOnlyLogic from "./SecondGroupOnlyLogic"
import work from "../../../../store/workSecondStore"
import auth from "../../../../store/authStore"
import users from "../../../../store/usersStore.js"
import { observer } from 'mobx-react-lite'
import FirstSecondTemplate from "../FirstSecondTemplate/FirstSecondTemplate"

const SecondGroupOnly = ({gas}) => {
	const { data, onSubmit, errors, objData, resetData,
		modalActive, setModalActive, onSubmitModal, fillGostData,
		fileUploaded, setFileUploaded } = SecondGroupOnlyLogic()
	const refusalData = work.workData?.refusalData

	useEffect(() => {
		work.getGasData(gas)
		return () => {
			work.setWorkData(null)
		}
	}, [gas])

	useEffect(() => {
		resetData(work.initialValues)
	}, [work.workData])

	useEffect(() => {
		if (!!fileUploaded[0]) {
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
			onUsernameClick={() => users.getUser(work.workData.user ? work.workData.user.id : (
				refusalData?.date ? refusalData?.user.id : null
			))}
			reason={refusalData?.text}
			date={work.workData.date ? work.workData.date.split(" ").join(", ") : (
				refusalData?.date ? work.workData.refusalData.date.split(" ").join(", ") : null
			)}
			objData={objData}
			data={data}
			errors={errors}
			buttonContent={"work.button"}
			onButtonClick ={onSubmit}
			isButtonLoading={work.loadingCreate}
			modalActive={modalActive}
			setModalActive={setModalActive}
			onSubmitModal={() => onSubmitModal(gas, refusalData?.date)}
			fillGostData={fillGostData}
			setFileUploaded={setFileUploaded}
			blink={fileUploaded.filter(el => el).length}
		/>
	)
}

export default React.memo(observer(SecondGroupOnly))



