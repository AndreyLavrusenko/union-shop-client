import {useEffect, useState} from "react";
import {productAPI} from "../../../api/api";
import {Link} from "react-router-dom";

const Category = ({setActiveCategory, activeCategory, setSearch}) => {
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    // Получение всех категорий товара
    useEffect(() => {
        const getCategory = async () => {
            const data = await productAPI.getAllCategoryType()
            setCategory(data)
            setLoading(false)
        }
        getCategory()
    }, [])


    const setActiveCategoryFunc = (category) => {
        setActiveCategory(category)
    }

    return (
        !loading && <div className="all__category">
            {category.map((item, i) => {
                return (
                    <Link
                        to={`/shop?category=${item.category_type}`}
                        key={i}
                        className={activeCategory === item.category_type ? "all__category-item active" : "all__category-item"}
                        onClick={() => setActiveCategoryFunc(item.category_type)}
                    >
                        {item.category_type}
                    </Link>
                )
            })}
            <Link
                to={"/shop"}
                onClick={() => {
                    setActiveCategoryFunc(null)
                    setSearch("")
                }}
                className={activeCategory === null ? "all__category-item active" : "all__category-item"}>
                Все
            </Link>
        </div>
    )
}

export default Category;