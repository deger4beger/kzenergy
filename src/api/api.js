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
	getGasData(gasName) {
		return instance.get(`chemical/gas/?gasName=${gasName}`)
			.then(res => res.data)
	},
	createGasData(data) {
		return instance.post("chemical/gas/", data)
			.then(res => res.data)
	}
}

