import React from "react"
import { Redirect } from "react-router-dom"
import auth from "../store/authStore"
import { observer } from 'mobx-react-lite';

export const withRolePow = (Component) => {
	const RedirectComponent = (props) => {
		if (auth.myData.role !== "powerplant") return <Redirect to="/login" />
		return <Component {...props} />
	}

	return observer(RedirectComponent)
}