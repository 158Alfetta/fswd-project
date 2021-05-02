
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext'

const PrivateRoute = ({user, component: Component, ...rest}) => {
    console.log(user)
    return (
        <Route {...rest} render={props => (
            user?.type === "Admin" ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;