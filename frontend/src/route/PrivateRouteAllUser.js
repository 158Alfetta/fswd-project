import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteAllUser = ({user, component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            user?.type === "Customer" ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRouteAllUser;