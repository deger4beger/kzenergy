import { makeAutoObservable, flow } from "mobx"
import { workApi } from '../api/api';

class Work {

	workData = null // {obj}
	loading = false
	loadingCreate = false
	error = null

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*getObjData(route) {
		try {
			this.loading = true
			const data = yield workApi.getObjData(route)
			this.setWorkData(data)
			this.loading = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	*createObjData(route, payload) {
		try {
			this.loadingCreate = true
			const data = yield workApi.createObjData(route, payload)
			this.setWorkData(data)
			this.loadingCreate = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	setWorkData(data) {
		this.workData = data
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

const store = new Work()

export default store