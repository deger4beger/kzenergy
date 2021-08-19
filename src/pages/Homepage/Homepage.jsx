import { useEffect } from 'react'
import { withoutAuthRedirect } from '../../hocs/withoutAuthRedirect'
import store from "../../store/homepageStore.js"
import MainGraph from "./MainGraph/MainGraph"
import SecGraph from "./SecGraph/SecGraph"
import InfoBlock from "./InfoBlock/InfoBlock"
import { observer } from 'mobx-react-lite';

const Homepage = () => {

	useEffect(() => {
		return () => store.setWorkData(null)
	}, [])

	return (
		<div>
			<MainGraph />
			{store.workData && <>
				<InfoBlock />
				<SecGraph />
			</>}
		</div>
	)
}

export default withoutAuthRedirect(observer(Homepage))