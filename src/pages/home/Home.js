import React from "react";
import Card from "../../components/card/Card";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../common/Preloader";
import {useCallback, useEffect} from "react";
import {productAPI} from "../../api/api";
import Advertising from "../../components/advertising/Advertising";

const Home = () => {
    // Все товары
    const {topProducts, categoryProducts, isLoading} = useSelector(state => state.product);
    const dispatch = useDispatch();

    const getAllProduct = useCallback(() => {
        productAPI.renderTop(dispatch)
        productAPI.renderCategory(dispatch)
    }, []);

    // Получение популярных товаров
    useEffect(() => {
        getAllProduct()
    }, [])

    const {firstCategory, secondCategory, thirdCategory} = categoryProducts


    return (
        <>
            {
                isLoading
                    ? <Preloader />
                    : <>
                        <Card products={topProducts} title={"Лучшие товары."} secondTitle={"Зацените."} />
                        {firstCategory.resultProduct.length > 0
                            ? <Card products={firstCategory.resultProduct} title={firstCategory.titles[0]} secondTitle={firstCategory.titles[1]} />
                            : null
                        }
                        {secondCategory.resultProduct.length > 0
                            ? <Card products={secondCategory.resultProduct} title={secondCategory.titles[0]} secondTitle={secondCategory.titles[1]} />
                            : null
                        }
                        {thirdCategory.resultProduct.length > 0
                            ? <Card products={thirdCategory.resultProduct} title={thirdCategory.titles[0]} secondTitle={thirdCategory.titles[1]} />
                            : null
                        }
                        <Advertising />
                    </>


            }
        </>
    )
}

export default React.memo(Home)