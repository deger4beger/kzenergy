import { makeAutoObservable, flow } from "mobx"
import { usersApi } from '../api/api';

class CornerMenu {

	workData = null // {obj}
	oneUserData = null
	loading = false
	error = null

	constructor() {
		makeAutoObservable(this, {
            fetchProjects: flow
        })
	}

	*getUsers(setModalActive) {
		try {
			this.loading = true
			const data = yield usersApi.getUsers()
			this.setWorkData(data)
			setModalActive(true)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loading = false
		}
	}

	*getUser(id) {
		try {
			this.loading = true
			const data = yield usersApi.getUser(id)
			this.setOneUserData(data)
		} catch (err) {
			this.errorHandler(err)
		} finally {
			this.loading = false
		}
	}

	setWorkData(data) {
		this.workData = data
	}

	setOneUserData(data) {
		this.oneUserData = data
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

const store = new CornerMenu()

export default store