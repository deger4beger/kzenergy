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
	loadingCalc = false
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

	*makeCalc(history) {
		try {
			this.loadingCalc = true
			const data = yield workApi.makeCalc()
			this.setWorkData(data)
			history.push("work/scroll")
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loadingCalc = false
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
		const comp = this.workData.archive.compressor
		const gts = this.workData.archive.powerplant
		const boil = this.workData.archive.boiler
		return [
			[
				[["NO2", tons], comp["NO2"], gts["NO2"], boil["NO2"]],
				[["NO", tons], comp["NO"], gts["NO"], boil["NO"]],
				[["SO2", tons], comp["SO2"], gts["SO2"], boil["SO2"]],
				[["CO", tons], comp["SO2"], gts["SO2"], boil["SO2"]],
				[null, comp["totalEmis"], gts["totalEmis"], boil["totalEmis"]]
			],
			[
				[["CO2", tons], comp["CO2"], gts["CO2"], boil["CO2"]],
				[["CH4", tons], comp["CH4"], gts["CH4"], boil["CH4"]],
				[["N2O", tons], comp["N2O"], gts["N2O"], boil["N2O"]],
				[null, comp["totalGrhs"], gts["totalGrhs"], boil["totalGrhs"]]
			],
			[
				[
					["E"],
					[comp["energy"], m, m],
					[gts["energy"], m, "work.firstGroup.name7Info"],
					[boil["energy"], m, tons]
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