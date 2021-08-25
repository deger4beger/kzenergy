import { makeAutoObservable, flow } from "mobx"
import { homepageApi } from '../api/api';

class Homepage {

	workData = null // {obj}
	loading = {
		0: false,
		1: false
	}
	error = null

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*getHomepageData(range, type, graph2, loadingType=0) {
		try {
			this.loading[loadingType] = true
			const data = yield homepageApi.getFirstGraph({period: range, emis: type, graph2})
			this.setWorkData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loading[loadingType] = false
		}
	}

	setWorkData(data) {
		if (!data) {
			this.workData = data
		}
		if (!this.workData) {
			this.workData = data
		} else {
			this.workData = {
				...this.workData,
				...data
			}
		}
	}

	getChartData(type, obj, theme) {
		const color = theme === "dark" ? "#CECECEFF" : "#565656FF"
		const font = {
    		size: 16,
    		family: "Josefin Sans"
  		}
  		const font2 = {
    		size: 15,
    		family: "Josefin Sans"
  		}
		return {
			data: {
				labels: this.getGraphOneLabels(type, obj),
			  	datasets: [
			    	{
			      		label: '% of elements',
			      		data: this.getGraphOneData(obj),
			      		backgroundColor: [
			      			'rgba(60, 120, 186, 0.2)',
			      			'rgba(46, 139, 87, 0.2)',
					        'rgba(255, 99, 132, 0.2)',
					        'rgba(255, 159, 64, 0.2)',
					    ],
			      		borderColor: [
			      			'rgba(60, 120, 186, 1)',
			      			'rgba(46, 139, 87, 1)',
			      			'rgba(255, 99, 132, 1)',
			        		'rgba(255, 159, 64, 1)',
			      		],
			      		borderWidth: 1
			   		}
			  	]
			},
		  	options: {
		  		responsive: true,
		    	maintainAspectRatio: false,
		    	plugins: {
		    		legend: {
		    			labels: this.getGraphLabels(color),
		    			position: "right"
		    		},
		    		tooltip: {
		    			titleFont: {
		    				...font,
		    				weight: 300
		    			},
		    			bodyFont: {
		    				...font2,
		    				weight: 300
		    			},
		    			footerFont: {
		    				...font2,
		    				weight: 300
		    			}
		    		}
		    	}
		  	}
		}
	}

	getGraphOneLabels(type, obj) {
		const total = this.workData.graph1[obj].elems.reduce((acc, curr) => acc + curr, 0)
		if (type === "grhs") {
			return this.workData.graph1[obj].elems.map((el, index) => {
				return `${["CO2", "CH4", "N2O"][index]} (${((el / total) * 100).toFixed(1)}%)`
			})
		}
		return this.workData.graph1[obj].elems.map((el, index) => {
			return `${["NO2", "NO", "SO2", "CO"][index]} (${((el / total) * 100).toFixed(1)}%)`
		})
	}

	getGraphOneData(obj) {
		return this.workData.graph1[obj].elems
	}

	getTypeLabels(type, t) {
		if (["compressor", "powerplant", "boiler"].includes(type)) {
			return [...Array(2)].map((_, index) => t(`work.thirdGroup.type${index + 1}`))
		}
		return [...Array(3)].map((_, index) => t(`homepage.obj${index + 1}`))
	}

	getChartTwoData(theme, type, t) {
		const color = theme === "dark" ? "#CECECEFF" : "#565656FF"
		const color2 = theme === "dark" ? "#2C2C2C" : "rgba(0, 0, 0, 0.2)"
		const color3 = theme === "dark" ? "#363636" : "#C9C8C8"
		const color4 = theme === "dark" ? "#454545" : "#B0B0B0"

		const isEnergy = type === "energy" ? true : false
		const m3 = t("work.firstGroup.name6Info")
		const tonsAxisLabel = t("work.firstGroup.name5Info")
		const energyAxisComprLabel = `${m3}/${m3}`
		const energyAxisPpLabel = `${m3}/${t("work.firstGroup.name7Info")}`
		const energyAxisBoilerLabel = `${m3}/${t("work.firstGroup.name5")}`

		const getTitleObj = (text) => {
			return {
    			display: true,
    			text,
    			color,
    			font: font2,
    		}
		}

		const font = {
    		size: 16,
    		family: "Josefin Sans"
  		}
  		const font2 = {
    		size: 15,
    		family: "Josefin Sans"
  		}
  		const commonScales = {
    		"one": {
	      		ticks: {
	      			color,
	      			font
	      		},
	      		grid: {
	      			color: color2,
	      			borderColor: color,
	      			borderWidth: 2
	      		},
	      		type: 'linear',
        		position: 'left',
        		title: getTitleObj(isEnergy ? energyAxisComprLabel : tonsAxisLabel)
	      	},
	      	"two": {
	      		ticks: {
	      			color,
	      			font
	      		},
	      		grid: {
	      			color: color3,
	      			borderColor: color3
	      		},
	      		type: 'linear',
        		position: 'left',
        		title: isEnergy ? getTitleObj(energyAxisPpLabel) : {}
	      	},
	      	x: {
	        	ticks: {
	         		color,
	          		font,
	          		stepSize: 1,
	          		beginAtZero: true,
	          		padding: 10
	        	},
	        	grid: {
	      			color: color2,
	      			borderColor: color,
	      			borderWidth: 2
	      		}
	      	}
	    }
	    const energyScales = {
	    	...commonScales,
	    	"three": {
	      		ticks: {
	      			color,
	      			font
	      		},
	      		grid: {
	      			color: color4,
	      			borderColor: color4
	      		},
	      		type: 'linear',
        		position: 'left',
        		title: getTitleObj(energyAxisBoilerLabel)
	      	}
	    }
	    const commonDatasets = [
	    	{
	     		label: this.getTypeLabels(type, t)[0],
	      		data: this.workData.graph2.total1,
	      		fill: false,
	      		backgroundColor: 'rgb(54, 162, 235)',
	      		borderColor: 'rgba(54, 162, 235, 0.6)',
	      		yAxisID: 'one'
	    	},
	    	{
	      		label: this.getTypeLabels(type, t)[1],
	      		data: this.workData.graph2.total2,
	      		fill: false,
	      		backgroundColor: 'rgb(255, 99, 132)',
	      		borderColor: 'rgba(255, 99, 132, 0.6)',
	      		yAxisID: 'two'
	    	}
	    ]
	    const energyDatasets = [
	    	...commonDatasets,
	    	{
	    		label: this.getTypeLabels(type, t)[2],
	      		data: this.workData.graph2.total3,
	      		fill: false,
	      		backgroundColor: 'rgb(171, 179, 69)',
	      		borderColor: 'rgba(171, 179, 69, 0.6)',
	      		yAxisID: 'three'
	    	}
	    ]
		return {
			data: {
			  	labels: this.workData.graph2.labels,
			  	datasets: type === "energy" ? energyDatasets : commonDatasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
			  	plugins: {
		    		legend: {
		    			labels: this.getGraphLabels(color)
		    		},
		    		tooltip: {
		    			titleFont: {
		    				...font,
		    				weight: 300
		    			},
		    			bodyFont: {
		    				...font2,
		    				weight: 300
		    			},
		    			footerFont: {
		    				...font2,
		    				weight: 300
		    			}
		    		}
		    	},
		    	scales: type === "energy" ? energyScales : commonScales
			}
		}
	}

	getGraphLabels(color) {
		return {
			color: color,
			padding: 14,
			font: {
				size: 16,
        		family: "Josefin Sans"
			}
		}
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

const store = new Homepage()

export default store