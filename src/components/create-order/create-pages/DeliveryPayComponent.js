import React, {useEffect} from 'react';
import CreateTitle from "../create-title/CreateTitle";
import {cartAPI, orderAPI} from "../../../api/api";
import {useNavigate} from "react-router-dom";

const DeliveryPayComponent = ({setQuantityState}) => {
    const navigate = useNavigate()

    useEffect(() => {
        const getCartQuantity = async () => {
            const count = await cartAPI.getCartQuantity()

            if (count === 0) navigate("/cart");
        }
        getCartQuantity()
    }, [])


    const onBuy = async () => {
        const {data} = await orderAPI.getOrdersQuantity()

        if (data) {
            await orderAPI.setPerformedOrderStatus()
            setQuantityState(0)
            return navigate('/order')
        }

        return navigate('/cart')


    }

    return (
        <div>
            <CreateTitle subtitle={"Оплата"} title={"Введите ваше имя и адрес:"}/>
            <div className="create__order">
                <button onClick={onBuy}>Купить</button>
            </div>
        </div>
    );
};

export default DeliveryPayComponent;