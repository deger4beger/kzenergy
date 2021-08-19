import React from 'react';
import { useTranslation } from 'react-i18next';
import s from "./FirstSecondTemplate.module.css"
import cn from "classnames"
import { MainButton } from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import ModalConfirm from "../../../../components/ModalConfirm/ModalConfirm"
import UploadExcel from "../UploadExcel/UploadExcel"

const FirstSecondTemplate = ({isFilledData, isSameUser, fullName, modalActive, setModalActive,
	date, objData, data, errors, buttonContent, onButtonClick, isButtonLoading,
	onSubmitModal, fillGostData, isRejectedData, reason, setFileUploaded, blink}) => {
	const { t } = useTranslation()
	return (
		<div className={s.container}>
			{(isFilledData || isRejectedData) && <div className={s.info}>
				<div className={isRejectedData ? cn(s.title, s.rejected) : (
					!isSameUser ? cn(s.title, s.red) : s.title)}>
					{isRejectedData ? (
						<span>{t("work.title3")}</span>) :
						isSameUser ? (
						<span>{t("work.title1")}</span>) : (
						<span>{t("work.title2")}</span>)}
				</div>
				<div className={s.infoItem}>
					<span className={s.infoContent}><span className={s.name}>{fullName}</span>
						{isSameUser && ` (${t("other.you")}) `}
						&nbsp;{date} &nbsp;UTC+6
					</span>
				</div>
				{isRejectedData && <div className={s.reason}>
					<div className={s.reasonTitle}>{t("work.thirdGroup.reason")}:</div>
					<div className={s.reasonContent}>{reason}</div>
				</div>}
			</div>}
			<div className={s.table}>
				<Table
					{...objData}
					data={data}
					disabled={isFilledData}
					errors={errors}
					blink={blink}
				/>
				{fillGostData && <div
					className={s.gostButton}
					onClick={isFilledData ? () => void 0 : fillGostData}
					>
					{t("work.gostButton")}
					</div>}
				<div className={s.excel}>
					<UploadExcel
						setFileUploaded={setFileUploaded}
						disabled={false}
					/>
				</div>
			</div>
			<div className={s.button}>
				<MainButton
					content={t(`${buttonContent}`)}
					onClick={onButtonClick}
					isLoading={isButtonLoading}
					disabled={isFilledData}
					styles={{
						padding: "3px 14px",
						fontSize: "var(--fsz24)",
						width: "450px",
						fontWeight: "300",
					}}
				/>
			</div>
			<ModalConfirm
				active={modalActive}
				setActive={setModalActive}
				info={t("other.modalInfo")}
				buttonInfo={t("other.modalConfirm")}
				onSubmitModal={onSubmitModal}
				bgc={"var(--selection)"}
			/>
		</div>
	)
}

export default React.memo(FirstSecondTemplate)