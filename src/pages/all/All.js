import Search from "../../components/all/search/Search";
import './all.scss'
import Category from "../../components/all/category/Category";
import {useEffect, useState} from "react";
import {productAPI} from "../../api/api";
import Preloader from "../../common/Preloader";
import AllCard from "../../components/all/allCard/AllCard";
import Pagination from "../../components/all/pagination/Pagination";


const All = () => {
    const [products, setProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)

    // Получение товаров из категорий или всех товаров сразу
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            const result = await productAPI.getAllCategory(activeCategory, page)
            setProducts(result.result)
            // Значения для пагинации
            setPage(result.page)
            setPages(result.totalPage)

            setLoading(false)
        }
        getProducts()
    }, [activeCategory, page])


    const setSearchProduct = (localSearch) => {
        setSearch(localSearch)
    }

    const changePage = ({selected: selectedPage}) => {
        setPage(selectedPage)
    }

    return (
        <>
            <Search setSearchProduct={setSearchProduct} setActiveCategory={setActiveCategory}/>
            <Category setSearch={setSearch} setActiveCategory={setActiveCategory} activeCategory={activeCategory}/>
            {loading
                ? <div style={{position: "relative", left: "-90px", top: 150+"px"}}><Preloader /></div>
                : <div className="all"><AllCard search={search} products={products}/></div>
            }
            <Pagination loading={loading} pages={pages} changePage={changePage}/>
        </>

    )
}

export default All