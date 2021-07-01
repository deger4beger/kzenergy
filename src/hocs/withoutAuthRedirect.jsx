import React from "react"
import { Redirect } from "react-router-dom"
import auth from "../store/authStore"

export const withoutAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (!auth.isAuth) return <Redirect to="/homepage" />
				return <Component {...this.props} />
		}
	}

	return RedirectComponent
}