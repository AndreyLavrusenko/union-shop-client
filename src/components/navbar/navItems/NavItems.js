import {NavLink} from "react-router-dom";
import React from "react";

const NavItems = ({quantityState, pathway, name, closeNavbar, children}) => {

    return (
        <li className="nav__list-item">
            <NavLink to={pathway}
                     className={({isActive}) => isActive ? "nav__list-link active" : "nav__list-link"}
                     onClick={() => closeNavbar(false)}
                     title={name} end>
                {children}
                <span className="nav__list-link-text">{name === "Корзина"
                    ? <div style={{display: "flex"}}>{name} <span className="nav__list-quantity">{quantityState}</span></div>
                    : name}
                </span>
            </NavLink>
        </li>
    )
}

export default NavItems;