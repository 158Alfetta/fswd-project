import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({user, component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            user?.type === "Admin" ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;