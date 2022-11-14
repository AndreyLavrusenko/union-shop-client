import React from "react";
import Card from "../../components/card/Card";
import Preloader from "../../common/Preloader";
import Advertising from "../../components/advertising/Advertising";
import './home.scss'

const Home = ({loading, topProduct, categoryProduct}) => {

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