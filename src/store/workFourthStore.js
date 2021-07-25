import { makeAutoObservable, flow } from "mobx"
import { workApi } from '../api/api';

class WorkFourth {

	workData = null // {obj}
	loading = false
	loadingCoef = {
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
	}
	error = null

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*getFinalReport() {
		try {
			this.loading = true
			const data = yield workApi.getFinalReport()
			this.setWorkData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loading = false
		}
	}

	*updateCoef(coef, value, index) {
		try {
			this.loadingCoef[index] = true
			const data = yield workApi.updateCoef(coef, value)
			this.setWorkData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loadingCoef[index] = false
		}
	}

	setWorkData(data) {
		this.workData = data
	}

	get getCoefFirst() {
		const data = this.workData
		return {0: data.NO2coef, 1: data.NOcoef, 2: data.SO2coef, 3: data.COcoef}
	}

	get getCoefSec() {
		const data = this.workData
		return {0: data.CO2coef, 1: data.CH4coef, 2: data.N2Ocoef}
	}

	get finalData() {
		const tons = "work.firstGroup.name5Info"
		const m = "work.firstGroup.name6Info"
		return [
			[
				[["NO2", tons], 1, 11, 111],
				[["NO", tons], 2, 22, 222],
				[["SO2", tons], 3, 33, 333],
				[["CO", tons], 4, 44, 444],
				[null, 10, 100, 1000]
			],
			[
				[["CO2", tons], 1, 11, 111],
				[["CH4", tons], 2, 22, 222],
				[["N2O", tons], 3, 33, 333],
				[null, 10, 100, 1000]
			],
			[
				[
					["E"],
					[5, m, m],
					[10, m, "work.firstGroup.name7Info"],
					[15, m, tons]
				]
			]
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

const store = new WorkFourth()

export default store