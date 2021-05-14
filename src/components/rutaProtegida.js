import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function RutaProtegida({ usuarioAutorizado, ...resto }) {
        return (
            <>
            {usuarioAutorizado
                ? <Route {...resto}/>
                : <Redirect to="/login" />
            }
            </>
        )
}
