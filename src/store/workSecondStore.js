import { makeAutoObservable, flow } from "mobx"
import { workApi } from '../api/api';

class WorkSecond {

	workData = null // {obj}
	loading = false
	loadingCreate = false
	error = null

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*getGasData(gasName) {
		try {
			this.loading = true
			const data = yield workApi.getGasData(gasName)
			console.log(data)
			this.setWorkData(data)
			this.loading = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	*createGasData(payload) {
		try {
			this.loadingCreate = true
			const data = yield workApi.createGasData(payload)
			this.setWorkData(data)
			this.loadingCreate = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	get initialValues() {
		return [this.workData?.nitrogen, this.workData?.sulfur,
			this.workData?.carbon,  this.workData?.density,
			this.workData?.CO2EmissionFactor, this.workData?.CH4SpecificFactor,
			this.workData?.N2OSpecificFactor, this.workData?.LowerHeatCombustion]
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

const store = new WorkSecond()

export default store