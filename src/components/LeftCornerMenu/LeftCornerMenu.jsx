import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import cn from "classnames"
import s from "./LeftCornerMenu.module.css"
import { useTranslation } from 'react-i18next';
import auth from "../../store/authStore.js"
import UserProfile from './UserProfile/UserProfile';
import Modal from "../Modal/Modal"
import store from "../../store/usersStore.js"
import loadingIcon from "assets/corner/loadingGreen.svg"
import { toJS } from 'mobx';
import { roles } from '../../store/staticObjects';

const LeftCornerMenu = () => {
	const { t } = useTranslation()
	const [firstActive, setFirstActive] = useState(false)
	const [secondActive, setSecondActive] = useState(false)
	const [thirdActive, setThirdActive] = useState(false)
	const [searchValue, setSearchValue] = useState("")
	const [profileData, setProfileData] = useState(null)

	useEffect(() => {
		if (store.oneUserData) {
			setThirdActive(true)
		}
	}, [store.oneUserData])

	const icons = ["🗿", "🔎"] // ["✎", "🔎︎", "✉", "🔔"]

	const onSecondActive = () => {
		store.getUsers(setSecondActive)
	}

	const onClicks = [
		() => setFirstActive(!firstActive),
		onSecondActive,
		() => void 0
	]

	const onSecondModalClose = () => {
		setSecondActive(false)
	}

	const getTotalUsers = () => {
		return toJS(store.workData)?.filter(el => el.fullName.includes(searchValue)).length
	}

	return (
		<>
			<div className={cn(s.wrapper, {[s.disabled]: !auth.isAuth})}>
				{[...Array(2)].map((_, index) => {
					return <div className={s.item} onClick={onClicks[index]} key={index}>
						<div className={s.icon}>
							{icons[index]}
						</div>
					</div>
				})}
			</div>
			<Modal active={firstActive} setActive={setFirstActive} styles={{"minWidth": "710px"}}>
				<UserProfile
					isMine
					avatar={auth.myData.avatar}
					name={auth.myData.fullName}
					email={auth.myData.email}
					role={auth.myData.role}
					phone={auth.myData.phone}
					loadingPhone={auth.loadingUpdatePhone}
					loadingAvatar={auth.loadingUpdatePhoto}
				/>
			</Modal>
			<Modal active={thirdActive} setActive={setThirdActive} styles={{"minWidth": "710px"}}>
				<UserProfile
					avatar={store.oneUserData?.avatar}
					name={store.oneUserData?.fullName}
					email={store.oneUserData?.email}
					role={store.oneUserData?.role}
					phone={store.oneUserData?.phone}
				/>
			</Modal>
			<Modal active={secondActive} setActive={onSecondModalClose} styles={{"minWidth": "710px"}}>
				{!profileData ? (
					<>
						<div className={s.upper}>
							<div className={s.searchIcon}>🔎︎</div>
							<input
								type="text"
								className={s.search}
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
							/>
						</div>
						<div className={s.lower}>
							<div className={s.total}>{t("cornerMenu.users")}: {getTotalUsers()}</div>
							{toJS(store.workData)?.sort((a, b) => a.fullName.localeCompare(b.fullName))
								.map((el, index) => {
								if (!el.fullName.includes(searchValue)) return <div />
								return <div className={s.userItem} key={el.id} onClick={() => setProfileData(el)}>
									{el.fullName}
									<span className={cn(s.role, {[s.admin]: el.role === "developer"})}>
										({t(roles[el.role])})
									</span>
								</div>
							})}
						</div>
					</>) : (
						<UserProfile
							avatar={profileData.avatar}
							name={profileData.fullName}
							email={profileData.email}
							role={profileData.role}
							phone={profileData.phone}
							onBackClick={() => setProfileData(null)}
						/>
					)}
			</Modal>
			{store.loading && <div className={s.loadingDiv}>
				<img src={loadingIcon} alt="" className={s.loadingIcon} />
			</div>}
		</>
	)
}

export default observer(LeftCornerMenu)