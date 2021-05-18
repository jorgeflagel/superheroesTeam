import React from 'react';
import { Redirect } from 'react-router-dom';

export default function ProtectedRoute({ authorizedUser, children}) {
        return (
            <>
            {authorizedUser
                ? <>{children}</>
                : <Redirect to="/login" />
            }
            </>
        )
}
