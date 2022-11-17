import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {cartAPI, productAPI} from "../../api/api";
import Card from "./Card";

const CardContainer = ({setQuantityState}) => {
    // Получаем из стора текущего пользователя
    const user = useSelector(state => state.user.currentUser);

    // Получение id из адресной строки
    const {id} = useParams();

    const [productData, setProductData] = useState(null)
    const [productInfo, setProductInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    // Перерисовка корзины при изменении кол-ва объектов
    const [rerenderCart, setRerenderCart] = useState(false)

    useEffect(() => {
        const getProduct = async () => {
            const {data} = await productAPI.getProductById(id)

            setProductData(data.result[0])
            setProductInfo(data.info_result)

            setLoading(false)
        }
        getProduct()
    }, [id])


    // Пишет кол-во товара в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCartQuantity()
            setQuantityState(data)
        }
        getCartCount()
    }, [rerenderCart])


    return (
        <Card
            isAuth={user}
            loading={loading}
            productData={productData}
            setRerenderCart={setRerenderCart}
            rerenderCart={rerenderCart}
            productInfo={productInfo}
        />
    );
};

export default CardContainer;