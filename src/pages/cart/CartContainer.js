import React, {useEffect, useState} from 'react';
import {cartAPI} from "../../api/api";
import Cart from "./Cart";
import {useSelector} from "react-redux";

const CartContainer = ({setQuantityState}) => {
    const user = useSelector(state => state.user.currentUser);

    const [availableBuy, setAvailableBuy] = useState(true)
    const [myCart, setMyCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [cartUpdate, setCartUpdate] = useState(true)


    // Получение товаров в корзине и количество этого товара в наличии из таблицы all_products
    useEffect(() => {
        const getAllProduct = async () => {
            const res = await cartAPI.getCart()
            if (res.resultCode) {
                setMyCart([])
            } else {
                setMyCart(res)
            }
            setLoading(false)
        }

        getAllProduct()
    }, [user, cartUpdate])


    // Получение кол-ва товаров в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCartQuantity()
            setQuantityState(Object.values(data)[0])
        }
        getCartCount()
    }, [cartUpdate, user, availableBuy])



    // Удаление элемента из корзины
    const handleDelete = async (id) => {
        // Делаем кнопку заказа достпуной
        // setAvailableBuy(true)
        setCartUpdate(!cartUpdate)
        // Удаление товара из корзины
        await cartAPI.deleteItemFromCart(id)
    }

    const changeAvailable = (status) => {
        setAvailableBuy(status)
    }


    return (
        <Cart
            myCart={myCart}
            loading={loading}
            changeAvailable={changeAvailable}
            handleDelete={handleDelete}
            availableBuy={availableBuy}
        />
    );
};

export default CartContainer;