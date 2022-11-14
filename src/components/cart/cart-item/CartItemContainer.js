import React, {useEffect, useState} from 'react';
import CartItem from "./CartItem";
import {productAPI} from "../../../api/api";

const CartItemContainer = ({
                               cart,
                               handleDelete,
                               changeAvailable,
                               productCount,
                           }) => {


    const [product, setProduct] = useState([])
    const color = cart.color
    const [loading, setLoading] = useState(true)
    let productCountAvailable = 0


    useEffect(() => {
        const getProductInfo = async () => {
            // Получение информации о товаре из таблицы all_products
            const {data} = await productAPI.getProductById(cart.productId)
            setProduct(data.result[0])
            setLoading(false)
        }

        getProductInfo()

    }, [])


    // const data = () => {
    //     productCount.map(product => {
    //         if (product.title_product === cart.productName && product.size === cart.size && product.color === cart.color) {
    //             productCountAvailable = product.count
    //         }
    //     })
    //
    //     if (productCountAvailable === 0) {
    //         changeAvailable(false)
    //     }
    // }
    //
    //
    // // Смотрим все ли товары в наличии
    // useEffect(() => {
    //     if (!loading) {
    //         data()
    //     }
    // }, [cart])
    //
    // if (!loading) {
    //     data()
    // }

    return (
        <CartItem
            handleDelete={handleDelete}
            product={product}
            productCountAvailable={productCountAvailable}
            cart={cart}
            color={color}
        />
    );
};

export default CartItemContainer;