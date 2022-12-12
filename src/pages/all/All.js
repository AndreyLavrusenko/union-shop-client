import Search from "../../components/all/search/Search";
import './all.scss'
import Category from "../../components/all/category/Category";
import {useState} from "react";
import Preloader from "../../common/Preloader";
import AllCard from "../../components/all/allCard/AllCard";
import Pagination from "../../components/all/pagination/Pagination";


const All = ({changePage, pages, activeCategory, loading, setActiveCategory, products}) => {
    const [search, setSearch] = useState("")

    const setSearchProduct = (localSearch) => {
        setSearch(localSearch)
    }


    return (
        <>
            <Search setSearchProduct={setSearchProduct} setActiveCategory={setActiveCategory}/>
            <Category setSearch={setSearch} setActiveCategory={setActiveCategory} activeCategory={activeCategory}/>
                <div className="all"><AllCard search={search} products={products}/></div>
            <Pagination loading={loading} pages={pages} changePage={changePage}/>
        </>

    )
}

export default All