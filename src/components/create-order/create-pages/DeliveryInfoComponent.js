import React, {useEffect, useState} from 'react';
import CreateTitle from "../create-title/CreateTitle";
import {useForm} from "react-hook-form";
import {authAPI, cartAPI, orderAPI} from "../../../api/api";
import {useNavigate} from 'react-router-dom'


const DeliveryInfoComponent = () => {
    const navigate = useNavigate()
    const {register, formState: {errors}, handleSubmit} = useForm()
    const [userData, setUserData] = useState({
        fullName: "",
        city: "",
        country: "",
        address: "",
        phone: "",
        index: "",
        region: "",
        email: ""
    })


    useEffect(() => {
        const getCartQuantity = async () => {
            const count = await cartAPI.getCartQuantity()

            if (count === 0) navigate("/cart");
        }
        getCartQuantity()
    }, [])


    // Проверяет совершал ли человек покупки и если да, то подставляет его данные в поля
    useEffect(() => {
        const getUserInfo = async () => {
            const {data} = await authAPI.getUserInfo()


            if (data[0].userInfo) {
                const user = JSON.parse(data[0].userInfo)

                setUserData({
                    fullName: user.fullName,
                    city: user.city,
                    country: user.country,
                    address: user.address,
                    phone: user.phone,
                    index: user.index,
                    region: user.region,
                    email: user.email
                })
            }

        }
        getUserInfo()
    }, [])



    const onSubmit = async (e, userData) => {
        e.preventDefault()

        // Записывает данные пользователя в бд после нажатия на кнопку
        await orderAPI.setUserInfoDelivery(JSON.stringify(userData), userData.email)
        return navigate("/delivery-pay");
    }

    const onChange = e => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <CreateTitle subtitle={"Введите ваше имя и адрес:"} title={"Куда отправить ваш заказ?"}/>
            <div className="create__order">
                <form onSubmit={e => onSubmit(e, userData)} className="order__form">
                    <input
                        required
                        type="name"
                        value={userData.fullName}
                        onChange={onChange}
                        name="fullName"
                        placeholder="ФИО (укажите полностью фамилию и имя)"
                        className="order__form-big order__form-input"
                    />
                    <div style={{display: "flex"}}>
                        <div>
                            <input
                                required
                                type="text"
                                value={userData.city}
                                onChange={onChange}
                                name="city"
                                placeholder="Город"
                                className="order__form-input order__form-middle"
                            />
                        </div>
                        <div>
                            <input
                                required
                                type="text"
                                name="country"
                                value={userData.country}
                                onChange={onChange}
                                placeholder="Страна"
                                className="order__form-input order__form-small"
                            />
                        </div>
                    </div>
                    <input
                        required
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={onChange}
                        placeholder="Улица, дом, квартира (укажите своей адрес полностью)"
                        className="order__form-big order__form-input"
                    />
                    <div style={{display: "flex"}}>
                        <div>
                            <input
                                required
                                type="text"
                                name="phone"
                                onChange={onChange}
                                value={userData.phone}
                                placeholder="Телефон"
                                className="order__form-input order__form-middle"
                            />
                        </div>
                        <div>
                            <input
                                required
                                type="number"
                                name="index"
                                value={userData.index}
                                onChange={onChange}
                                placeholder="Почтовый индекс"
                                className="order__form-input order__form-small"
                            />
                        </div>
                    </div>
                    <input
                        required
                        type="text"
                        name="region"
                        value={userData.region}
                        onChange={onChange}
                        placeholder="Регион"
                        className="order__form-big order__form-input"
                    />


                    <span className="order__form-label">
                        Введите адрес своей электронной почты. <br/>
                        На этот адрес будут отправляться уведомления о статусе заказа.
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={onChange}
                        required={true}
                        placeholder="Ваш адрес электронной почты"
                        className="order__form-input order__form-special"
                    />
                    <div/>

                    <span className="order__form-label">
                       Введите промокод
                    </span>

                    <div className="order__form-promo">
                        <input
                            {...register("promo")}
                            type="text"
                            name="promo"
                            className="order__form-input order__form-special"
                        />
                        <button type="button">Применить</button>
                    </div>
                    <p className="order__form-error order__promo-error">Неверный промокод</p>

                    <div className="checkbox">
                        <input required className="custom-checkbox" type="checkbox" id="conditions" name="conditions" value="conditions" />
                        <label htmlFor="conditions">
                            Я принимаю условия: Условия доставки и оплаты / Shipping and Payment, Согласие на обработку
                            персональных данных / Consent to the Processing of Personal Data</label>
                    </div>

                    <div className="checkbox">
                        <input {...register("news")} className="custom-checkbox" type="checkbox" id="news" name="news" value="true" />
                        <label htmlFor="news">
                            Подписаться на новости и эксклюзивные предложения
                        </label>
                    </div>


                    <button className="order__form-buy" type="submit">Продолжить</button>

                </form>


            </div>
        </div>
    );
};

export default DeliveryInfoComponent;