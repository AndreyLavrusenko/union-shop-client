import React, {useEffect, useState} from 'react';
import Home from "./Home";
import {productAPI} from "../../api/api";

const HomeContainer = () => {
    // Все товары
    const [loading, setLoading] = useState(true)
    const [topProduct, setTopProduct] = useState(null)
    const [categoryProduct, setCategoryProduct] = useState(null)

    const getAllProduct = async () => {
        const topProduct = await productAPI.renderTop()
        const categoryProduct = await productAPI.renderCategory()

        setTopProduct(topProduct)
        setCategoryProduct(categoryProduct)

        setLoading(false)
    };

    // Получение популярных товаров
    useEffect(() => {
        getAllProduct()
    }, [])


    return (
        <Home
            loading={loading}
            topProduct={topProduct}
            categoryProduct={categoryProduct}
        />
    );
};

export default HomeContainer;