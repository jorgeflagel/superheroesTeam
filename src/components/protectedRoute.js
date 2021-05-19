import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ authorizedUser, children, ...rest}) {
        return (
            <>
            {authorizedUser
                ? <Route {...rest}>{children}</Route>
                : <Redirect to="/login" />
            }
            </>
        )
}
