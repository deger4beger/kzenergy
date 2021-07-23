import { useState } from 'react'
import cn from "classnames"
import s from "./GroupItem.module.css"
import { MainButton } from '../../../../components/Button/Button';
import Modal from "../../../../components/Modal/Modal"
import Input from "../../../../components/Input/Input"
import { useTranslation } from 'react-i18next';
import work from "../../../../store/workThirdStore"

const GroupItem = ({isRecieved, title, children, currItem, rejectLoading,
	status, isRejectDisabled}) => {
	const { t } = useTranslation()
	const [active, setActive] = useState(isRecieved)
	const [modalActive, setModalActive] = useState(false)
	const [info, setInfo] = useState("")
	const onRejectClick = (e) => {
		e.stopPropagation()
		setModalActive(true)
	}
	const onRejectConfirm = () => {
		if (!info) return
		if (currItem === "sweetGas") {
			work.rejectDataChem(currItem, {text: info})
		} else {
			work.rejectDataObj(currItem, {text: info})
		}
		setModalActive(false)
	}

	return (
		<div className={s.wrapper}>
			<div
				className={s.header} onClick={() => setActive(!active)}

				>
				<div className={active ? s.title : cn(s.title, s.disabled)}>
					<span className={isRecieved ? s.sign : cn(s.sign, s.red)}>
						{isRecieved ? "✓" : "☩"}
					</span>
					{title}
					{status && <div className={!isRecieved ? s.info : cn(s.info, s.recieved)}>
						({status})
					</div>}
				</div>
				<div className={s.right}>
					{<div className={!isRejectDisabled ? s.reject : cn(s.reject, s.disabled)}>
						<MainButton
							content={t("work.thirdGroup.reject")}
							onClick={onRejectClick}
							isLoading={rejectLoading}
							styles={{
								padding: "2px 18px 1px",
								fontSize: "var(--fsz15)",
								borderColor: "var(--error)"
							}}
						/>
					</div> }
					<div className={active ? s.icon : cn(s.icon, s.disabled)}>›</div>
				</div>
			</div>
			<div className={active ? s.content : cn(s.content, s.disabled)}>
				{children}
			</div>
			<Modal active={modalActive} setActive={setModalActive}>
				<div className={s.modalInfo}>
					{t("work.thirdGroup.typeReason")}
					<div className={s.modalInput}>
						<Input
							placeholder={t("work.thirdGroup.reason")}
							value={info}
							onChange={(e) => setInfo(e.currentTarget.value)}
						/>
					</div>
				</div>
				<MainButton
					content={t("work.thirdGroup.reject")}
					onClick={onRejectConfirm}
					styles={{
						fontSize: "var(--fsz24)",
						backgroundColor: "var(--error)"
					}}
				/>
			</Modal>
		</div>
	)
}

export default GroupItem