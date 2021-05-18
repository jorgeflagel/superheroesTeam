import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function NavigationBar( { authorizedUser, setAuthorizedUser } ) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleButton = useRef(null);
    const insideNavbarCollapse = useRef(null);

    const handleClick = e => {
        if (insideNavbarCollapse.current.contains(e.target) || toggleButton.current.contains(e.target)) {
          // inside click
          return;
        }  // outside click 
          setIsOpen(false);
      };
  
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });

    const toggleNavbar = () => {
        setIsOpen(isOpen => !isOpen)
    }

    const logout = () => {
        localStorage.removeItem('tokenHeroesTeam');
        setAuthorizedUser(false);
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">

            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Superheroes Team</Link>
                {authorizedUser 
                    ? <button className="btn btn-danger ms-auto order-md-last me-3" onClick={logout}>Logout</button>
                    : null}
                <button ref={toggleButton} className="navbar-toggler" type="button" onClick={toggleNavbar} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${!isOpen ? 'collapse' : ''} navbar-collapse text-center`} id="navbarSupportedContent" ref={insideNavbarCollapse}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink exact to={"/"} className="nav-link" activeClassName="active" onClick={toggleNavbar}>
                            Home
                        </NavLink>
                        <NavLink to={"/addHeroes"} className="nav-link" activeClassName="active" onClick={toggleNavbar}>
                            Add Superheroe
                        </NavLink>
                    </ul>
                </div>
            </div>
            
        </nav>
    )
}
