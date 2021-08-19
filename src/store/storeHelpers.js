export const getFinalData = (data) => {
	const tons = "work.firstGroup.name5Info"
	const m = "work.firstGroup.name6Info"
	const comp = data.compressor
	const gts = data.powerplant
	const boil = data.boiler
	return [
		[
			[["NO2", tons], comp["NO2"], gts["NO2"], boil["NO2"]],
			[["NO", tons], comp["NO"], gts["NO"], boil["NO"]],
			[["SO2", tons], comp["SO2"], gts["SO2"], boil["SO2"]],
			[["CO", tons], comp["CO"], gts["CO"], boil["CO"]],
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
				["E", "work.firstGroup.help6"],
				[comp["energy"], m, m],
				[gts["energy"], m, "work.firstGroup.name7Info"],
				[boil["energy"], m, tons]
			]
		]
	]
}

export const getPercents = (data) => {
	const comp = data.compressor
	const gts = data.powerplant
	const boil = data.boiler
	return [
		[
			[comp["NO2%"], gts["NO2%"], boil["NO2%"]],
			[comp["NO%"], gts["NO%"], boil["NO%"]],
			[comp["SO2%"], gts["SO2%"], boil["SO2%"]],
			[comp["CO%"], gts["CO%"], boil["CO%"]],
			[comp["totalEmis%"], gts["totalEmis%"], boil["totalEmis%"]]
		],
		[
			[comp["CO2%"], gts["CO2%"], boil["CO2%"]],
			[comp["CH4%"], gts["CH4%"], boil["CH4%"]],
			[comp["N2O%"], gts["N2O%"], boil["N2O%"]],
			[comp["totalGrhs%"], gts["totalGrhs%"], boil["totalGrhs%"]]
		],
		[
			[comp["energy%"], gts["energy%"], boil["energy%"]]
		]
	]
}