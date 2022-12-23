import React, {useEffect, useState} from 'react';
import SmallCard from "./small-card/SmallCard";


const OrderCard = ({
                       allProduct,
                       status,
                       id,
                       isDelivered = false
                   }) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentId(prev => {
                if (prev === allProduct.length - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [])


    if (status !== 'Выполнено') {
        switch (status) {
            case 'performed':
                status = 'Выполняется'
                break;
            case 'sent':
                status = 'Отправлено'
                break;
            case 'delivered':
                status = 'Доставлено'
                break;
        }
    }


    return (
        <div className="order__card">
            <div className="order__number">Заказ {id}</div>
            <div className="order__status">{status}</div>

            {
                allProduct.length > 1
                    ?
                    <SmallCard
                        title={allProduct[currentId].title} description={allProduct[currentId].description}
                        color={allProduct[currentId].color}
                        subColor={allProduct[currentId].subColor}
                        backgroundcolor={allProduct[currentId].backgroundcolor}
                        image={allProduct[currentId].image}
                    />

                    :
                    <SmallCard
                        title={allProduct[0].title} description={allProduct[0].description}
                        color={allProduct[0].color}
                        subColor={allProduct[0].subColor} backgroundcolor={allProduct[0].backgroundcolor}
                        image={allProduct[0].image} isAnimation={false}
                    />
            }

            {isDelivered
                ? <button className="order__button order__button-status" style={{marginTop: '40px'}}>Детали
                    заказа</button>
                : <>
                    <button className="order__button order__button-status">Детали заказа</button>
                    {
                        allProduct.length > 1
                        ? <button className="order__button order__button-track">{allProduct[currentId].trackNumber ? allProduct[currentId].trackNumber : "Скоро здесь будет трек номер"}</button>
                        : <button className="order__button order__button-track">{allProduct[0].trackNumber ? allProduct[0].trackNumber : "Скоро здесь будет трек номер"}</button>
                    }
                </>
            }
        </div>
    );
};

export default OrderCard;