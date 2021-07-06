import React from "react"
import { Redirect } from "react-router-dom"
import auth from "../store/authStore"
import { observer } from 'mobx-react-lite';

export const withAuthRedirect = (Component) => {
	const RedirectComponent = (props) => {
		if (auth.isAuth) return <Redirect to="/homepage" />
		return <Component {...props} />
	}

	return observer(RedirectComponent)
}