import s from "./FirstSecondTemplate.module.css"
import cn from "classnames"
import { MainButton } from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import { useTranslation } from 'react-i18next';
import React from 'react';

const FirstSecondTemplate = ({isFilledData, isSameUser, fullName,
	date, objData, data, errors, buttonContent, onButtonClick, isButtonLoading}) => {
	const { t } = useTranslation()

	return (
		<div className={s.container}>
			{isFilledData && <div className={s.info}>
				<div className={!isSameUser ? cn(s.title, s.red) : s.title}>
					{isSameUser ? (
						<span>{t("work.title1")}</span>) : (
						<span>{t("work.title2")}</span>)}
				</div>
				<div className={s.infoItem}>
					<span className={s.infoContent}><span className={s.name}>{fullName}</span>
						{isSameUser && " (You) "}
						&nbsp;{date} &nbsp;UTC+6
					</span>
				</div>
			</div>}
			<div className={!isFilledData ? cn(s.table, s.margin) : s.table}>
				<Table
					{...objData}
					data={data}
					disabled={isFilledData}
					errors={errors}
				/>
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
		</div>
	)
}

export default React.memo(FirstSecondTemplate)