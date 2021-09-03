import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import cn from "classnames"
import s from "./ThirdGroup.module.css"
import GroupTemplate from "./GroupTemplate/GroupTemplate"
import GroupItemContent from "./GroupItemContent/GroupItemContent"
import GroupItem from "./GroupItem/GroupItem"
import work from "../../../store/workThirdStore"
import auth from "../../../store/authStore"
import usersStore from "../../../store/usersStore.js"
import { Preloader } from '../../../components/Preloader/Preloader';
import { observer } from 'mobx-react-lite';
import FirstGroupOnlyLogic from '../FirstSecondGroup/FirstGroupOnly/FirstGroupOnlyLogic';
import SecondGroupOnlyLogic from '../FirstSecondGroup/SecondGroupOnly/SecondGroupOnlyLogic';
import Table from '../../../components/Table/Table'
import { MainButton } from '../../../components/Button/Button';
import ModalConfirm from '../../../components/ModalConfirm/ModalConfirm';

const ThirdGroup = () => {
	const [modalActive, setModalActive] = useState(false)
	const { t } = useTranslation()
	const { firstObjData, secObjData, thirdObjData } = FirstGroupOnlyLogic()
	const { objData } = SecondGroupOnlyLogic()
	const objects = {
		compressor: ["work.obj1", firstObjData],
		boiler: ["work.obj3", thirdObjData],
		powerplant: ["work.obj2", secObjData]
	}
	const gases = {
		sweetGas: ["work.obj4", objData]
	}

	const confirmReport = () => {
		work.confirmReport()
		setModalActive(!modalActive)
	}

	useEffect(() => {
		work.getReport()

		return () => {
			work.setWorkData(null)
		}
	}, [])

	const data = work.workData
	const confirmData = work.workData?.confirmData
	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("work.thirdGroup.report")}
				{data && <span className={confirmData?.isConfirmed ? s.titleInfo : cn(s.titleInfo, s.progr)}>
					({confirmData?.isConfirmed ? t("work.thirdGroup.signedTitle") : (
						t("work.thirdGroup.inProgr")
					)})
				</span>}
			</div>
			{!data ? <Preloader /> : (
				<>
					<GroupTemplate
						title={"work.thirdGroup.title1"}
						mainColor={"var(--emission)"}
						>
						{Object.keys(data).map((key, index) => {
							if (["gases", "confirmData"].includes(key)) return <div />
							const {date, id, user, gasComposition, refusalData, isEdited, ...rest} = data[key]
							return <GroupItem
								key={index}
								isRecieved={!!date}
								title={t(objects[key][0])}
								currItem={key}
								rejectLoading={work.loadingReject[key]}
								status={refusalData?.date ? t("work.thirdGroup.rejected") : (
									isEdited ? t("work.thirdGroup.edited") : null
								)}
								isRejectDisabled={!date || confirmData.isConfirmed}
								>
								<GroupItemContent
									user={user?.fullName ? user?.fullName : refusalData?.user?.fullName}
									onUserClick={() => usersStore.getUser(user?.fullName ? user?.id : refusalData?.user?.id)}
									date={date ? date : refusalData?.date}
									gasType={!date ? null : (
										gasComposition ? t(gases[gasComposition.gasName][0]) : null
									)}
									isSameUser={auth.myData.id === refusalData?.user?.id}
									>
									{!!data[key].date &&
										<Table
											{...objects[key][1]}
											data={Object.values(rest).map((el) => {
												return [el, () => void 0]
											})}
											disabled={true}
											errors={[]}
											colors={work.colorsObj}
										/>
									}
								</GroupItemContent>
							</GroupItem>
						})}
					</GroupTemplate>
					<GroupTemplate
						title={"work.thirdGroup.title2"}
						mainColor={"var(--gas)"}
						thirdType={false}
						>
						{Object.keys(data.gases).map((key, index) => {
							const {date, id, user, gasName, refusalData, isEdited, ...rest} = data.gases[key]
							return <GroupItem
								isRecieved={!!date}
								title={t(gases[key][0])}
								key={index}
								currItem={key}
								rejectLoading={work.loadingReject[key]}
								status={refusalData?.date ? t("work.thirdGroup.rejected") : (
									isEdited ? t("work.thirdGroup.edited") : null
								)}
								isRejectDisabled={!date || confirmData.isConfirmed}
								>
								<GroupItemContent
									user={user?.fullName ? user?.fullName : refusalData?.user?.fullName}
									onUserClick={() => usersStore.getUser(user?.fullName ? user?.id : refusalData?.user?.id)}
									date={date ? date : refusalData?.date}
									isSameUser={auth.myData.id === refusalData?.user?.id}
									>
									{!!data.gases[key].date &&
										<Table
											{...gases[key][1]}
											data={Object.values(rest).map((el) => {
												return [el, () => void 0]
											})}
											disabled={true}
											errors={[]}
											colors={work.colorsLab}
										/>
									}
								</GroupItemContent>
							</GroupItem>
						})}
					</GroupTemplate>
					<div className={s.confirmBtn}>
						<MainButton
							content={t(`work.thirdGroup.${confirmData.isConfirmed ? "signed" : "signRep"}`)}
							onClick={() => setModalActive(!modalActive)}
							isLoading={work.loadingCreate}
							disabled={!confirmData.isConfirmable}
							styles={{
								fontSize: "var(--fsz24)",
								backgroundColor: "var(--mainDark)",
								color: "white",
								width: "280px",
								height: "50px"
							}}
						/>
						<ModalConfirm
							active={modalActive}
							setActive={setModalActive}
							info={t("work.thirdGroup.signRepInfo")}
							buttonInfo={t("other.modalConfirm")}
							onSubmitModal={confirmReport}
						/>
						{confirmData.isConfirmed && <div className={s.confirmInfo}>
							<span onClick={() => usersStore.getUser(confirmData.user?.id)}>
								{confirmData.user?.fullName}
							</span>
								{(confirmData.user?.id === auth.myData.id) && (
									<span className={s.sameUser}>({t("other.you")})</span>
								)}
							&nbsp;-&nbsp;
							<span>
								{confirmData.date}
							</span>
						</div>}
					</div>
				</>
			)}
		</div>
	)
}

export default observer(ThirdGroup)