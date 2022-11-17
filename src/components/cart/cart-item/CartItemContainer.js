import React, {useEffect, useState} from 'react';
import CartItem from "./CartItem";
import {cartAPI} from "../../../api/api";


const CartItemContainer = ({
                               cart,
                               handleDelete,

                           }) => {


    const [product, setProduct] = useState([])
    const color = cart.color
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getProductInfo = async () => {
            // Получение общей информации о товаре из таблицы product
            const data = await cartAPI.getItemFromCart(cart.uniqCode)
            setProduct(data)
            setLoading(false)
        }

        getProductInfo()

    }, [cart])

    if (!loading) {
        return (
            <CartItem
                handleDelete={handleDelete}
                product={product}
                cart={cart}
                color={color}
            />
        );
    }

};

export default CartItemContainer;