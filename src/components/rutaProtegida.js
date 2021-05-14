import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function RutaProtegida({ usuarioAutorizado, children}) {
        return (
            <>
            {usuarioAutorizado
                ? <>{children}</>
                : <Redirect to="/login" />
            }
            </>
        )
}
