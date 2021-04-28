
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const { loading, user } = useSession()
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            loading ?
                <h2>Loading</h2>
            : user?.type === "Admin" ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;