import React, {useEffect, useState} from 'react';
import All from "./All";
import {productAPI} from "../../api/api";

const AllContainer = () => {
    const [products, setProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)

    // Получение товаров из категорий или всех товаров сразу
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            const result = await productAPI.getAllCategory(activeCategory, page)
            setProducts(result.result)
            // Значения для пагинации
            setPage(+result.page)
            setPages(result.totalPage)

            setLoading(false)
        }
        getProducts()
    }, [activeCategory, page])

    const changePage = ({selected: selectedPage}) => {
        setPage(selectedPage)
    }


    return (
        <All
            changePage={changePage}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            loading={loading}
            products={products}
            pages={pages}
        />
    );
};

export default AllContainer;