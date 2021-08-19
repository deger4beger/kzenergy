import { useState } from 'react';
import * as XLSX from 'xlsx'
import cn from "classnames"
import s from "./UploadExcel.module.css"
import uploadDark from "assets/uploadDark.png"
import uploadWhite from "assets/uploadWhite.png"
import { MainButton } from '../../../../components/Button/Button';
import { useTheme } from '../../../../hooks/useTheme';
import Modal from "../../../../components/Modal/Modal"
import { useTranslation } from 'react-i18next';
import ex1 from "assets/excel/ex1.png"
import ex2 from "assets/excel/ex2.png"
import ex3 from "assets/excel/ex3.png"

const UploadExcel = ({setFileUploaded, disabled}) => {
	const [theme] = useTheme()
	const [modalActive, setModalActive] = useState(false)
	const { t } = useTranslation()

	const isNumber = (value) => {
	  	return typeof value === 'number' && isFinite(value);
	}

	const onExcelClick = (e) => {
		if (e.target.files) {
			const files = e.target.files, f = files[0]
		    const reader = new FileReader()
		    reader.onload = function (e) {
		        const data = e.target.result
		        const readedData = XLSX.read(data, {type: 'binary'})
		        const wsname = readedData.SheetNames[0]
		        const ws = readedData.Sheets[wsname]
		        const dataParse = XLSX.utils.sheet_to_json(ws, {header:1})
		        const finalArray = []
        		for (let i of dataParse) {
        			for (let j of i) {
        				if (isNumber(j)) {
        					finalArray.push(j)
        				}
        			}
        		}
        		setFileUploaded(finalArray)
		    }
		    reader.readAsBinaryString(f)
		}

		e.target.type = 'text'
  		e.target.type = 'file'
	}

	return (
		<div className={cn(s.wrapper, {[s.disabled]: disabled})}>
			<label htmlFor="uploadPhoto">
				<div className={s.button}>
					<MainButton
						content={"Excel"}
						onClick={onExcelClick}
						isLoading={false}
						disabled={false}
						icon={theme === "dark" ? uploadDark : uploadWhite}
						styles={{
							fontSize: "var(--fsz21)",
							backgroundColor: "var(--firstBg)",
							color: "var(--main)",
							width: "160px",
							height: "100px",
							fontWeight: "400"
						}}
					/>
				</div>
			</label>
			<input
				type="file"
				name="photo"
				id="uploadPhoto"
				onChange={onExcelClick}
			/>
			<div className={s.info} onClick={() => setModalActive(true)}>?</div>
			<Modal active={modalActive} setActive={setModalActive}>
				<div className={s.modalContent}>
					<div className={s.modalInfo}>
						<div>{t("work.modalInfo1")}</div>
						<div>{t("work.modalInfo2")}</div>
					</div>
					<div className={s.goodEx}>
						<img src={ex1} alt="" />
						<span>✓</span>
					</div>
					<div className={s.goodEx}>
						<img src={ex2} alt="" />
						<span>✓</span>
					</div>
					<div className={s.badEx}>
						<img src={ex3} alt="" />
						<span>✗</span>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default UploadExcel