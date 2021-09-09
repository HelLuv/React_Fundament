import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './../router/index';
import { AuthContext } from './../context/index';
import { Loader } from './UI/Loader/Loader';

export const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Loader />
	}
	return (
		isAuth
			? <Switch>
				{privateRoutes.map(route =>
					<Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
				)}
				<Redirect to="/posts" />
			</Switch>
			: <Switch>
				{publicRoutes.map(route =>
					<Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
				)}
				<Redirect to="/login" />
			</Switch>
	)
}
