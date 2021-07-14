import s from "./ThirdGroup.module.css"
import GroupTemplate from "./GroupTemplate/GroupTemplate"
import GroupItemContent from "./GroupItemContent/GroupItemContent"
import GroupItem from "./GroupItem/GroupItem"
import { useTranslation } from 'react-i18next';

const ThirdGroup = () => {
	const { t } = useTranslation()

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{t("work.thirdGroup.report")}
			</div>
			<GroupTemplate
				title={"work.thirdGroup.title1"}
				mainColor={"var(--emission)"}
			>
				<GroupItem
					isRecieved={true}
					title={"Gas compressors fucking motherfucking"}
				>
					<GroupItemContent />
				</GroupItem>
				<GroupItem
					isRecieved={false}
					title={"Gas compressors fucking motherfucking"}
				>
					<GroupItemContent />
				</GroupItem>
				<GroupItem
					isRecieved={false}
					title={"Gas compressors fucking motherfucking"}
				>
					<GroupItemContent />
				</GroupItem>
			</GroupTemplate>
			<GroupTemplate
				title={"work.thirdGroup.title2"}
				mainColor={"var(--gas)"}
				thirdType={false}
			>
				<GroupItem
					isRecieved={true}
					title={"Gas compressors fucking motherfucking"}
				>
					<GroupItemContent />
				</GroupItem>
			</GroupTemplate>
		</div>
	)
}

export default ThirdGroup