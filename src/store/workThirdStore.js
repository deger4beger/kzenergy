import { makeAutoObservable, flow } from "mobx"
import { workApi } from '../api/api';

class WorkThird {

	workData = null // {obj}
	loading = false
	loadingCreate = false
	error = null

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*getReport() {
		try {
			this.loading = true
			const data = yield workApi.getReport()
			this.setWorkData(data)
			this.loading = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	*createFinalReport(payload) {
		try {
			// this.loadingCreate = true
			// const data = yield workApi.createGasData(payload)
			// this.setWorkData(data)
			// this.loadingCreate = false
		} catch (err) {
			// this.errorHandler(err)
		}
	}

	setWorkData(data) {
		this.workData = data
	}

	get colorsObj() {
		return [
			[true, true, true],
			[false, false, true],
			[false, false, true]
		]
	}

	get colorsLab() {
		return [
			[true, false, false],
			[true, false, false],
			[true, false, false],
			[true, true, false],
			[false, true, false],
			[false, true, false],
			[false, true, false],
			[false, true, false]
		]
	}

	errorHandler(err) {
		this.loading = false
		this.loadingCreate = false
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

const store = new WorkThird()

export default store