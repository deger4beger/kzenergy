import decode from "jwt-decode"

export const validateToken = () => {
	let myData = JSON.parse(localStorage.getItem("access"))
	if (!myData) {
		myData = JSON.parse(sessionStorage.getItem("access"))
	}
	if (myData) {
		const decodedToken = decode(myData.access)

		if (decodedToken.exp * 1000 < new Date().getTime()) return null

		return myData
	}
	return false
}
