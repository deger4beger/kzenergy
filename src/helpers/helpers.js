import decode from "jwt-decode"

export const validateToken = () => {
	const myData = JSON.parse(localStorage.getItem("access"))
	if (myData) {
		const decodedToken = decode(myData.access)

		if (decodedToken.exp * 1000 < new Date().getTime()) return null

		return myData
	}
	return false
}
