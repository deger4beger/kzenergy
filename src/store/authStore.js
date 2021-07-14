import { makeAutoObservable, flow } from "mobx"
import { authApi } from '../api/api';

class Auth {
	myData = {
		id: null,
		email: null,
		name: null,
		access: null,
		role: null
	}
	isAuth = undefined
	loading = false
	error = ""

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*register(payload, history) {
		try {
			this.loading = true
			const data = yield authApi.register(payload)
			this.setMyData(data)
			history.push("/work")
			// this.error && this.errorReset()
			this.loading = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	*auth(payload, history, dontRememberMe) {
		try {
			this.loading = true
			const data = yield authApi.auth(payload)
			console.log(data)
			this.setMyData(data, !dontRememberMe, dontRememberMe)
			history.push("/work")
			// this.error && this.errorReset()
			this.loading = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	errorHandler(err) {
		this.loading = false
		if (!err.response || !err.response?.data?.error) {
			this.error = "Server error"
		} else {
			this.error = err.response.data.error
		}
	}

	logout() {
		this.myData = {
			id: null,
			created: null,
			username: null,
			rating: null
		}
		localStorage.removeItem("access")
		this.isAuth = false
	}

	setMyData(data, setToLocalStorage = true, dontRememberMe=false) {
		this.myData = {
			...this.myData,
			...data
		}
		this.isAuth = true
		setToLocalStorage && localStorage.setItem("access", JSON.stringify(data))
		dontRememberMe && sessionStorage.setItem("access", JSON.stringify(data))
		delete this.myData.token
	}

	errorReset() {
		this.error = ""
	}

}

const store = new Auth()

export default store