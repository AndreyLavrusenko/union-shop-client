import React, {useState} from "react";
import Card from "../../components/card/Card";
import Preloader from "../../common/Preloader";
import {useEffect} from "react";
import {productAPI} from "../../api/api";
import Advertising from "../../components/advertising/Advertising";
import './home.scss'

const Home = () => {
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


    if (loading) {
        return <Preloader/>
    }


    const {firstCategory: {data: firstCategory}, secondCategory: {data: secondCategory}, thirdCategory: {data: thirdCategory}} = categoryProduct

    return (
        <>
            <Card products={topProduct} title={"Лучшие товары."} secondTitle={"Зацените."}/>
            {firstCategory.resultProduct.length > 0
                ? <Card products={firstCategory.resultProduct} title={firstCategory.titles[0]}
                        secondTitle={firstCategory.titles[1]}/>
                : null
            }
            {secondCategory.resultProduct.length > 0
                ? <Card products={secondCategory.resultProduct} title={secondCategory.titles[0]}
                        secondTitle={secondCategory.titles[1]}/>
                : null
            }
            {thirdCategory.resultProduct.length > 0
                ? <Card products={thirdCategory.resultProduct} title={thirdCategory.titles[0]}
                        secondTitle={thirdCategory.titles[1]}/>
                : null
            }
            <Advertising/>
        </>
    )

}

export default React.memo(Home)