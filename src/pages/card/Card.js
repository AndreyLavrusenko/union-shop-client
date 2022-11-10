import {useEffect, useState} from "react";
import {productAPI} from "../../api/api";
import {useParams} from "react-router-dom";
import CardSlider from "../../components/card-product/card-slider/CardSlider";
import Preloader from "../../common/Preloader";
import CardInfo from "../../components/card-product/card-info/CardInfo";
import './card.scss'

const Card = ({isAuth, setRerenderCart, rerenderCart}) => {
    // Получение id из адресной строки
    const {id} = useParams();

    const [productData, setProductData] = useState(null)
    const [productInfo, setProductInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProduct = async () => {
            const {data} = await productAPI.getProductById(id)

            setProductData(data.result[0])
            setProductInfo(data.info_result)

            setLoading(false)
        }
        getProduct()
    }, [id])

    if (loading) {
        return (
            <Preloader/>
        )
    }


    return (
        <div className="card">
            <CardSlider image={productData.image} images={productData.image_arr} title={productData.title}/>
            <CardInfo
                setRerenderCart={setRerenderCart}
                rerenderCart={rerenderCart}
                isAuth={isAuth}
                productInfo={productInfo}
                productData={productData}
            />
        </div>

    )
}

export default Card