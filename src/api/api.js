import axios, { CancelToken } from "axios"
import { validateToken } from '../helpers/helpers';
import auth from "../store/authStore"

const instance = axios.create({
	withCredentials: true,
	baseURL: "https://kzenergy.herokuapp.com/",
})

instance.interceptors.request.use((req) => {
	const myData = validateToken()
	if (myData) {
		req.headers.Authorization = `Bearer ${myData.access}`
	}
	if (myData === null) {
		auth.logout()
		return {
	    	...req,
	    	cancelToken: new CancelToken((cancel) => cancel('Cancel repeated request'))
	   	}
	}
	return req
})

const parseToQueryStr = (params) => {
	return Object.keys(params)
		.map(key => params[key] ? `${key}=${params[key]}` : "")
		.filter(el => el)
		.join('&')
}

export const authApi = {
	register(payload) {
		return instance.post("user/register/", payload)
			.then(res => res.data)
	},
	auth(payload) {
		return instance.post("user/login/", payload)
			.then(res => res.data)
	}
}

export const workApi = {
	getObjData(route) {
		return instance.get(`object/${route}/`)
			.then(res => res.data)
	},
	createObjData(route, data) {
		return instance.post(`object/${route}/`, data)
			.then(res => res.data)
	},
	updateObjData(route, data) {
		return instance.put(`object/${route}/`, data)
			.then(res => res.data)
	},
	getGasData(gasName) {
		return instance.get(`chemical/?gasName=${gasName}`)
			.then(res => res.data)
	},
	createGasData(data) {
		return instance.post("chemical/", data)
			.then(res => res.data)
	},
	updateGasData(data) {
		return instance.put("chemical/", data)
			.then(res => res.data)
	},
	getReport(data) {
		return instance.get("mining/")
			.then(res => res.data)
	},
	rejectDataObj(obj, payload) {
		return instance.patch(`object/${obj}/`, payload)
			.then(res => res.data)
	},
	rejectDataChem(payload) {
		return instance.patch("chemical/", payload)
			.then(res => res.data)
	},
	confirmReport() {
		return instance.patch("mining/")
			.then(res => res.data)
	},
	getFinalReport() {
		return instance.get("environment/")
			.then(res => res.data)
	},
	updateCoef(coef, value) {
		return instance.patch("environment/", {
			[coef]: value
		}).then(res => res.data)
	},
	makeCalc() {
		return instance.post("environment/")
			.then(res => res.data)
	}
}

export const archiveApi = {
	getArchive(group) {
		return instance.get(`archive/?role=${group}`)
			.then(res => res.data)
	}
}

export const homepageApi = {
	getFirstGraph(params) {
		const qs = parseToQueryStr(params)
		return instance.get(`main/?${qs}`)
			.then(res => res.data)
	}
}

export const profileApi = {
	updatePhone(payload) {
		return instance.patch("user/update/phone/", payload)
			.then(res => res.data)
	},
	updatePhoto(payload) {
		return instance.patch("user/update/avatar/", payload, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}).then(res => res.data)
	}
}

export const usersApi = {
	getUsers() {
		return instance.get("user/list/")
			.then(res => res.data)
	},
	getUser(id) {
		return instance.get(`user/list/${id}/`)
			.then(res => res.data)
	}
}

