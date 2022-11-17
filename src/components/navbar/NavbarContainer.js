import React, {useEffect, useState} from 'react';
import {authAPI, cartAPI} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "./Navbar";

const NavbarContainer = ({setQuantityState, quantityState}) => {
    const dispatch = useDispatch()
    // Получаем из стора текущего пользователя
    const user = useSelector(state => state.user.currentUser);
    // Открыта боковая панель или нет
    const [navbar, setNavbar] = useState(false)

    // Перерисовка корзины при изменении кол-ва объектов
    const [rerenderCart, setRerenderCart] = useState(false)

    // Вход в аккаунт через стороние сервисы
    useEffect(() => {
        const getUserLogin = async () => {
            if (!user) {
                await authAPI.loginByThirdPartyService(dispatch)
            }
        }
        getUserLogin()
    }, [user])

    // Пишет кол-во товара в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCartQuantity()
            setQuantityState(data)
        }
        getCartCount()
    }, [rerenderCart])


    // Показывать боковую панель взависимости от размера экрана
    useEffect(() => {
        if (document.documentElement.clientWidth < 1000) {
            setNavbar(false)
        } else {
            setNavbar(true)
        }
    }, [])


    // Убирает боковое меню при уменьшении экрана
    window.addEventListener('resize', (e) => {
        if (e.currentTarget.innerWidth <= 1000) {
            setNavbar(false)
        } else {
            setNavbar(true)
        }
    })

    const closeNavbar = (status) => {
        if (document.documentElement.clientWidth < 1000) {
            setNavbar(status)
        }
    }


    const handleLogout = async () => {
        await authAPI.logout(dispatch)
    }

    return (
        <Navbar quantityState={quantityState} handleLogout={handleLogout} isAuth={user} navbar={navbar} closeNavbar={closeNavbar} />
    );
};

export default NavbarContainer;