import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {cartAPI} from "../../../api/api";

const NavItems = ({name, pathway, rerenderCart, children}) => {
    const [quantityState, setQuantityState] = useState(0)

    // Пишет кол-во товара в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCart()
            setQuantityState(data.result.length)
        }
        getCartCount()
    }, [rerenderCart])

    return (
        <li className="nav__list-item">
            <NavLink to={pathway}
                     className={({isActive}) => isActive ? "nav__list-link active" : "nav__list-link"}
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