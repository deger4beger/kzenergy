import { makeAutoObservable, flow } from "mobx"
import { authApi, profileApi } from '../api/api';

class Auth {
	myData = {
		id: null,
		email: null,
		fullName: null,
		access: null,
		role: null,
		avatar: null,
		phone: null
	}
	isAuth = undefined
	loading = false
	loadingUpdatePhone = false
	loadingUpdatePhoto = false
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
			this.loading = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	*auth(payload, history, dontRememberMe) {
		try {
			this.loading = true
			const data = yield authApi.auth(payload)
			this.setMyData(data, !dontRememberMe, dontRememberMe)
			history.push("/work")
			this.loading = false
		} catch (err) {
			this.errorHandler(err)
		}
	}

	*changePhone(phone) {
		try {
			this.loadingUpdatePhone = true
			const data = yield profileApi.updatePhone({phone})
			this.updateMyData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loadingUpdatePhone = false
		}
	}

	*changePhoto(photoFile) {
		try {
			this.loadingUpdatePhoto = true
			const formData = new FormData()
			formData.append("avatar", photoFile)
			const data = yield profileApi.updatePhoto(formData)
			this.updateMyData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loadingUpdatePhoto = false
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

	updateMyData(data) {
		this.myData = {
			...this.myData,
			...data
		}
		localStorage.setItem("access", JSON.stringify(this.myData))
	}

	errorReset() {
		this.error = ""
	}

}

const store = new Auth()

export default store