import React from 'react';
import CreateTitle from "../create-title/CreateTitle";
import {useForm} from "react-hook-form";


const DeliveryInfoComponent = () => {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm()

    const onSubmit = (data) => {
        alert(data)
    }

    return (
        <div>
            <CreateTitle subtitle={"Введите ваше имя и адрес:"} title={"Куда отправить ваш заказ?"}/>
            <div className="create__order">
                <form onSubmit={handleSubmit(onSubmit)} className="order__form">
                    <input
                        {...register("fullName", {
                            required: "Поле обязательно к заполнению"
                        })}
                        type="name"
                        name="fullName"
                        placeholder="ФИО (укажите полностью фамилию и имя)"
                        className="order__form-big order__form-input"
                    />
                    <div>{errors?.fullName &&
                        <p className="order__form-error">{errors?.fullName?.message || "Ошибка"}</p>}</div>
                    <div style={{display: "flex"}}>
                        <div>
                            <input
                                {...register("city", {
                                    required: "Поле обязательно к заполнению"
                                })}
                                type="text"
                                name="city"
                                placeholder="Город"
                                className="order__form-input order__form-middle"
                            />
                            <span>{errors?.city &&
                                <p className="order__form-error">{errors?.city?.message || "Ошибка"}</p>}</span>
                        </div>
                        <div>
                            <input
                                {...register("country", {
                                    required: "Поле обязательно к заполнению"
                                })}
                                type="text"
                                name="country"
                                placeholder="Страна"
                                className="order__form-input order__form-small"
                            />
                            <span>{errors?.country &&
                                <p className="order__form-error">{errors?.country?.message || "Ошибка"}</p>}</span>
                        </div>
                    </div>
                    <input
                        {...register("address", {
                            required: "Поле обязательно к заполнению"
                        })}
                        type="text"
                        name="address"
                        placeholder="Улица, дом, квартира (укажите своей адрес полностью)"
                        className="order__form-big order__form-input"
                    />
                    <div>{errors?.address &&
                        <p className="order__form-error">{errors?.address?.message || "Ошибка"}</p>}</div>
                    <div style={{display: "flex"}}>
                        <div>
                            <input
                                {...register("phone", {
                                    required: "Поле обязательно к заполнению"
                                })}
                                type="tel"
                                name="phone"
                                placeholder="Телефон"
                                className="order__form-input order__form-middle"
                            />
                            <span>{errors?.phone &&
                                <p className="order__form-error">{errors?.phone?.message || "Ошибка"}</p>}</span>
                        </div>
                        <div>
                            <input
                                {...register("index", {
                                    required: "Поле обязательно к заполнению"
                                })}
                                type="number"
                                name="index"
                                placeholder="Почтовый индекс"
                                className="order__form-input order__form-small"
                            />
                            <span>{errors?.index &&
                                <p className="order__form-error">{errors?.index?.message || "Ошибка"}</p>}</span>
                        </div>
                    </div>
                    <input
                        {...register("region", {
                            required: "Поле обязательно к заполнению"
                        })}
                        type="text"
                        name="region"
                        placeholder="Регион"
                        className="order__form-big order__form-input"
                    />
                    <div>{errors?.region &&
                        <p className="order__form-error">{errors?.region?.message || "Ошибка"}</p>}</div>

                    <span className="order__form-label">
                        Введите адрес своей электронной почты. <br/>
                        На этот адрес будут отправляться уведомления о статусе заказа.
                    </span>
                    <input
                        {...register("email", {
                            required: "Поле обязательно к заполнению"
                        })}
                        type="email"
                        name="email"
                        required={true}
                        placeholder="Ваш адрес электронной почты"
                        className="order__form-input order__form-special"
                    />
                    <div>{errors?.region &&
                        <p className="order__form-error">{errors?.region?.message || "Ошибка"}</p>}</div>

                    <span className="order__form-label">
                       Введите промокод
                    </span>
                    <div className="order__form-promo">
                        <input
                            type="text"
                            name="promo"
                            className="order__form-input order__form-special"
                        />
                        <button>Применить</button>
                    </div>

                    <div>
                        <button type="submit">faweaw</button>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default DeliveryInfoComponent;