import { makeAutoObservable, flow } from "mobx"
import { archiveApi } from '../api/api';
import { getFinalData } from './storeHelpers';

class Archive {

	workData = null // {obj}
	loading = false
	error = null

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*getFinalReport(group) {
		try {
			this.loading = true
			const data = yield archiveApi.getArchive(group)
			this.setWorkData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loading = false
		}
	}

	setWorkData(data) {
		this.workData = data
	}

	getTableData(role, elem) {
		switch(role) {
			case "compressor":
			case "powerplant":
			case "boiler": {
				const {id, date, user, ...rest} = elem
				return Object.values(rest).map(el => [el, () => void 0])
			}
			case "chemical": {
				const {id, date, user, gasName, ...rest} = elem
				return Object.values(rest).map(el => [el, () => void 0])
			}
			default: {
				return null
			}
		}
	}

	getFinalData(el) {
		const response = getFinalData(el)
		return response
	}

	errorHandler(err) {
		if (!err.response || !err.response?.data?.error) {
			this.error = "Server error"
		} else {
			this.error = err.response.data.error
		}
	}
	errorReset() {
		this.error = ""
	}
}

const store = new Archive()

export default store