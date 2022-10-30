import {NavLink} from "react-router-dom";
import React from "react";

const NavItems = ({name, pathway, children}) => {
    return (
        <li className="nav__list-item">
            <NavLink to={pathway}
                     className={({isActive}) => isActive ? "nav__list-link active" : "nav__list-link"}
                     title={name} end>
                {children}
                <span className="nav__list-link-text">{name}</span>
            </NavLink>
        </li>
    )
}

export default NavItems;