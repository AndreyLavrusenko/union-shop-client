import React, {useEffect, useState} from 'react';
import CreateTitle from "../create-title/CreateTitle";
import {Link, useNavigate} from "react-router-dom";
import {cartAPI, orderAPI} from "../../../api/api";


const DeliveryButton = ({text, price, setIsSelected, isSelected, id, setPrice, setType}) => {

    return (
        <Link
            id={id}
            className={id === isSelected ? "delivery__type-link delivery__type-active" : "delivery__type-link"}
            onClick={() => {
                setIsSelected(id)
                setPrice(price)
                setType(text)
            }}
        >
            <p>{text}</p>
            <span>{price !== 0 ? price + " ₽" : null}</span>
        </Link>
    )
}


const DeliveryTypeComponent = () => {
    const navigate = useNavigate()


    useEffect(() => {
        const getCartQuantity = async () => {
            const count = await cartAPI.getCartQuantity()

            if (count === 0) navigate("/cart");
        }
        getCartQuantity()
    }, [])

    const [isSelected, setIsSelected] = useState(0)
    const [price, setPrice] = useState(0)
    const [type, setType] = useState("")

    const [updatePrice, setUpdatePrice] = useState(false)

    useEffect(() => {
        setUpdatePrice(!updatePrice)
    }, [])

    const setDeliveryType = async () => {
        await orderAPI.setNewDeliveryPrice(price, type)
        setUpdatePrice(!updatePrice)

        return navigate("/delivery-info");
    }

    return (
        <div>
            <CreateTitle subtitle={"Выберите способ доставки:"} title={"Оформление заказа"} updatePrice={updatePrice}/>
            <div className="create__order delivery__type">
                <DeliveryButton id={1} setPrice={setPrice} setType={setType} isSelected={isSelected} setIsSelected={setIsSelected} text={"Курьерская доставка по Санкт-Петербургу"} price={500}/>
                <DeliveryButton id={2} setPrice={setPrice} setType={setType} isSelected={isSelected} setIsSelected={setIsSelected} text={"Пункт выдачи заказов Boxberry"} price={257}/>
                <DeliveryButton id={3} setPrice={setPrice} setType={setType} isSelected={isSelected} setIsSelected={setIsSelected} text={"Бесплатная доставка"} price={0} />

                {isSelected
                    ? <button className="delivery__type-button" onClick={setDeliveryType}>Продолжить</button>
                    : null
                }
            </div>
        </div>
    );
};

export default DeliveryTypeComponent;