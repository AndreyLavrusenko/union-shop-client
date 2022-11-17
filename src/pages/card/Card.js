import CardSlider from "../../components/card-product/card-slider/CardSlider";
import Preloader from "../../common/Preloader";
import CardInfo from "../../components/card-product/card-info/CardInfo";

import './card.scss'

const Card = ({loading, isAuth, setRerenderCart, productData, productInfo, rerenderCart}) => {

    if (loading) {
        return (
            <Preloader/>
        )
    }


    return (
        <div className="card">
            <CardSlider image={productData.image} background={productData.backgroundcolor} images={productData.image_arr} title={productData.title}/>
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