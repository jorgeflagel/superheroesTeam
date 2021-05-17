import React from 'react'

export default function Home({ equipo }) {
    return (
        <div>
            <h1>Página Home</h1>
            <ol>
                {equipo.map((id) => <li>{id}</li>)}
            </ol>
        </div>
    )
}
