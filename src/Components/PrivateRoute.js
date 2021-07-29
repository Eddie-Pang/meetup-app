import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { isAuth } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return isAuth() ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
