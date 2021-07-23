import React from "react"
import { Redirect } from "react-router-dom"
import auth from "../store/authStore"
import { observer } from 'mobx-react-lite';

export const withRoleBoil = (Component) => {
	const RedirectComponent = (props) => {
		if (auth.myData.role !== "boiler") return <Redirect to="/login" />
		return <Component {...props} />
	}

	return observer(RedirectComponent)
}