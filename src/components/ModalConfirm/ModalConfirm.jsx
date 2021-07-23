import s from "./ModalConfirm.module.css"
import Modal from "../Modal/Modal"
import { MainButton } from '../Button/Button';

const ModalConfirm = ({active, setActive, info, buttonInfo, onSubmitModal, bgc="var(--selection)"}) => {

	return (
		<Modal active={active} setActive={setActive}>
			<div className={s.modalInfo}>
				{info}
			</div>
			<MainButton
				content={buttonInfo}
				onClick={onSubmitModal}
				styles={{
					fontSize: "var(--fsz24)",
					backgroundColor: `${bgc}`
				}}
			/>
		</Modal>
	)
}

export default ModalConfirm