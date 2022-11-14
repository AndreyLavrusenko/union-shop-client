import React, {useEffect, useState} from 'react';
import {cartAPI, productAPI} from "../../api/api";
import Cart from "./Cart";

const CartContainer = ({setQuantityState}) => {
    const [availableBuy, setAvailableBuy] = useState(true)
    const [myCart, setMyCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [productCount, setProductCount] = useState([])
    const [cartUpdate, setCartUpdate] = useState(true)


    useEffect(() => {
        const getAllProduct = async () => {
            // Получение всех товаров
            const res = await productAPI.getProductQuantity()
            setProductCount(res.data)
        }

        getAllProduct()
    }, [])

    useEffect(() => {
        const getCartCount = async () => {
            // Получение кол-ва товаров в корзине
            const data = await cartAPI.getCartQuantity()
            setQuantityState(Object.values(data)[0])
        }
        getCartCount()
    }, [cartUpdate])


    useEffect(() => {
        const getCartHandler = async () => {
            setLoading(true)
            // Получение товаров в корзине
            const {result} = await cartAPI.getCart()
            setMyCart(result)
            setLoading(false)
        }
        getCartHandler()
    }, [availableBuy])


    // Удаление элемента из корзины
    const handleDelete = async (id) => {
        // Делаем кнопку заказа достпуной
        setAvailableBuy(true)
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
            productCount={productCount}
        />
    );
};

export default CartContainer;