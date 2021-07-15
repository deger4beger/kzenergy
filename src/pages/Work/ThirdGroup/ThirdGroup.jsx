import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import s from "./ThirdGroup.module.css"
import GroupTemplate from "./GroupTemplate/GroupTemplate"
import GroupItemContent from "./GroupItemContent/GroupItemContent"
import GroupItem from "./GroupItem/GroupItem"
import work from "../../../store/workThirdStore"
import { Preloader } from '../../../components/Preloader/Preloader';
import { observer } from 'mobx-react-lite';
import FirstGroupOnlyLogic from '../FirstSecondGroup/FirstGroupOnly/FirstGroupOnlyLogic';
import SecondGroupOnlyLogic from '../FirstSecondGroup/SecondGroupOnly/SecondGroupOnlyLogic';
import Table from '../../../components/Table/Table';

const ThirdGroup = () => {
	const { t } = useTranslation()
	const { firstObjData, secObjData, thirdObjData } = FirstGroupOnlyLogic()
	const { objData } = SecondGroupOnlyLogic()
	const objects = {
		compressor: ["work.obj1", firstObjData],
		boiler: ["work.obj3", thirdObjData],
		powerPlant: ["work.obj2", secObjData]
	}
	const gases = {
		sweetGas: ["work.obj4", objData]
	}


	useEffect(() => {
		work.getReport()

		return () => {
			work.setWorkData(null)
		}
	}, [])

	const data = work.workData
	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("work.thirdGroup.report")}
			</div>
			{!data ? <Preloader /> : (
				<>
					<GroupTemplate
						title={"work.thirdGroup.title1"}
						mainColor={"var(--emission)"}
						>
						{Object.keys(data).map((key, index) => {
							if (key === "gases") return <div />
							const {date, id, user, gasComposition, ...rest} = data[key]
							return <GroupItem
								isRecieved={!!date}
								title={t(objects[key][0])}
								key={index}
								>
								<GroupItemContent
									user={user?.fullName}
									date={date}
									gasType={gasComposition ? t(gases[gasComposition.gasName][0]) : null}
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
							const {date, id, user, gasName, ...rest} = data.gases[key]
							return <GroupItem
								isRecieved={!!date}
								title={t(gases[key][0])}
								key={index}
								>
								<GroupItemContent
									user={user?.fullName}
									date={date}
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
				</>
			)}
		</div>
	)
}

export default observer(ThirdGroup)