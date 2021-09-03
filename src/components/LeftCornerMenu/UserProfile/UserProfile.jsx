import React, { useEffect, useRef, useState } from 'react'
import cn from "classnames"
import s from "./UserProfile.module.css"
import { useTranslation } from 'react-i18next';
import auth from "../../../store/authStore.js"
import { MainButton } from '../../Button/Button';
import loadingIcon from "assets/corner/loadingGreen.svg"
import logoIconDark from "assets/logoIconDark.png"
import logoIconWhite from "assets/logoIconWhite.png"
import { useTheme } from '../../../hooks/useTheme';
import { roles } from '../../../store/staticObjects';

const UserProfile = ({isMine, avatar, name, email, role, phone,
	loadingPhone, loadingAvatar, onBackClick}) => {
	const { t } = useTranslation()
	const [ theme ] = useTheme()
	const [phoneInput, setPhoneInput] = useState(phone ? phone : "")
	const photoRef = useRef()

	useEffect(() => {
		setPhoneInput(phone ? phone : "")
	}, [phone])

	const onPhoneSubmit = (e) => {
		if (phoneInput.length !== 13) return
		auth.changePhone(phoneInput)
		photoRef.current.blur()
	}

	const onResetPhone = () => {
		setPhoneInput(phone ? phone : "")
	}

	const onSetPhoneInput = (e) => {
		const length = e.target.value.length
		if (length > 13) return
		if ([3, 7, 10].includes(length) && length > phoneInput.length) {
			setPhoneInput(e.target.value + "-")
			return
		}
		setPhoneInput(e.target.value)
	}

	const onUploadPhoto = (e) => {
		auth.changePhoto(e.target.files[0])

		e.target.type = 'text'
  		e.target.type = 'file'
	}

	return (
		<div className={s.wrapper}>
			{onBackClick && <div className={s.backArrow} onClick={onBackClick}>🠔</div>}
			<div className={s.left}>
				<img src={theme === "dark" ? logoIconDark : logoIconWhite} alt="" />
			</div>
			<div className={s.middle}>
				{avatar ? (
					<img src={avatar} alt="" className={s.avatar} />
					) : (!loadingAvatar ? "ヽ(°□° )ノ" : "")
				}
				{loadingAvatar && <div className={s.loadingDiv}>
					<img src={loadingIcon} alt="" className={s.loadingAvatar} />
				</div>}
				{isMine && (
					<>
						<label htmlFor="uploadAvatar">
							<div className={s.upload}>
								<div className={s.uploadText}>✎ {t("cornerMenu.edit")} (3:4)</div>
							</div>
						</label>
						<input
							type="file"
							id="uploadAvatar"
							onChange={onUploadPhoto}
						/>
					</>
				)}
			</div>
			<div className={s.right}>
				<div className={s.rightUpper}>
					{name}
				</div>
				<div className={s.rightLower}>
					<div className={s.lowerItem}>
						<span>{t("login.email")}:</span>
						{email}
					</div>
					<div className={s.lowerItem}>
						<span>{t("login.role")}:</span>
						{t(roles[role])}
					</div>
					<div className={cn(s.lowerItem, {
							[s.disabled]: !isMine,
							[s.loading]: loadingPhone,
							[s.error]: phoneInput.length !== 13,
							[s.ok]: phoneInput.length === 13 && phoneInput !== phone
						})}>
						<span>{t("login.phone")}:</span>
						{(phone || isMine) ? (
							<>
								<div className={s.prePhone}>+7</div>
								<input
									type="phone"
									value={phoneInput}
									onChange={onSetPhoneInput}
									onKeyPress={(event) => {
										if (event.key === "Enter") {
											onPhoneSubmit()
										}
								        if (!/[0-9-]/.test(event.key)) {
								          	event.preventDefault()
								        }
								    }}
								    ref={photoRef}
								/>
								{(phone !== phoneInput) && (!!phoneInput) && (
									<div className={s.btns}>
										<span onClick={onPhoneSubmit}>✓</span>
										<span onClick={onResetPhone}>✗</span>
									</div>
								)}
							</>
						) : (<span className={s.none}>{t("other.none")}</span>)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile