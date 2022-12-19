import React, {useEffect, useState} from 'react';
import '../../../pages/delivery/delivery.scss'
import {orderAPI} from "../../../api/api";

const CreateTitle = ({title, subtitle, updatePrice}) => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getSum = async () => {
            const {data} = await orderAPI.getOrderSum()
            setTotal(data[0].total + data[0].deliveryPrice)
        }
        getSum()
    }, [updatePrice])


    return (
        <>
            <div className="create__total">Итог {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}</div>
            <div className="create__title">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </>
    );
};

export default CreateTitle;