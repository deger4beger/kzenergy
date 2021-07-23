import { makeAutoObservable, flow } from "mobx"
import { workApi } from '../api/api';

class WorkThird {

	workData = null // {obj}
	loading = false
	loadingCreate = false
	loadingReject = {
		compressor: false,
		powerplant: false,
		boiler: false,
		sweetGas: false
	}
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
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loading = false
		}
	}

	*rejectDataObj(objName, payload) {
		try {
			this.loadingReject[objName] = true
			const data = yield workApi.rejectDataObj(objName, payload)
			this.setWorkData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loadingReject[objName] = false
		}
	}

	*rejectDataChem(gasName, payload) {
		try {
			this.loadingReject[gasName] = true
			const data = yield workApi.rejectDataChem({
				...payload,
				gasName
			})
			this.setWorkData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loadingReject[gasName] = false
		}
	}

	*confirmReport() {
		try {
			this.loadingCreate = true
			const data = yield workApi.confirmReport()
			this.setWorkData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loadingCreate = false
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