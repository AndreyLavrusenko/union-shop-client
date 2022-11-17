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
    const [updateDelete, setUpdateDelete] = useState(false)


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

        getAllProduct().then(() => setUpdateDelete(!updateDelete))

    }, [user, cartUpdate])


    // Получение кол-ва товаров в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCartQuantity()
            setQuantityState(data)
        }
        getCartCount()
    }, [cartUpdate, user, availableBuy])


    // При удалении элемента из корзина, смотрит остались ли там товары, которых нет в наличии
    // Если их нет, то разрешает покупку
    useEffect(() => {
        myCart.map(item => {
            if (item.quantity > item.count) {
                setAvailableBuy(false)
            }
        })

    }, [updateDelete])


    // Удаление элемента из корзины
    const handleDelete = async (id) => {
        // Удаление товара из корзины
        await cartAPI.deleteItemFromCart(id)
        // Ререндер корзины
        setCartUpdate(!cartUpdate)
        setAvailableBuy(true)
    }


    if (loading) return;


    return (
        <Cart
            myCart={myCart}
            loading={loading}
            handleDelete={handleDelete}
            availableBuy={availableBuy}
        />
    );
};

export default CartContainer;