import React, {useEffect, useState} from 'react';
import './status.scss'
import StatusInfo from "../../components/status/StatusInfo";
import StatusProducts from "../../components/status/statusProducts/StatusProducts";
import StatusDetails from "../../components/status/StatusDetails/StatusDetails";
import {useParams} from "react-router-dom";
import {orderAPI} from "../../api/api";
import {logRoles} from "@testing-library/react";

const Status = () => {
    //TODO получение данных товара по id (передача через props)
    const {id} = useParams();
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        const getOrderInfo = async () => {
            const {data} = await orderAPI.getOrderById(id)
            setOrderData(data)
        }
        getOrderInfo()
    }, [])

    if (orderData.length === 0) return

    return (
        <div className="status">
            <div className="status__wrapper">
                <StatusInfo orderId={orderData.result[0].id} orderStatus={orderData.result[0].status} />
                <StatusProducts orderProducts={orderData.arr} />
            </div>

            <StatusDetails orderDetails={orderData.result} />
        </div>
    );
};

export default Status;