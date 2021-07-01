import axios from "axios"

const instance = axios.create({
	baseURL: "https://kzenergy.herokuapp.com/",
})

instance.interceptors.request.use((req) => {
	if (localStorage.getItem("token")) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`
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

