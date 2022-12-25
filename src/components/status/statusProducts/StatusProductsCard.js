import React from 'react';

const StatusProductsCard = ({orderDetails}) => {
    return (
        <div className="status__card">
            <div>
                <img src={orderDetails.image} alt=""/>
            </div>
            <div className="status__card-data">
                <div className="status__card-name">{orderDetails.title}</div>
                <div className="status__card-list">
                    <div className="status__card-left">Цвет</div>
                    <div className="status__card-right status__card-color" style={{backgroundColor: orderDetails.color}}>{orderDetails.color ? null : 'Универсальный'}</div>
                </div>
                <div className="status__card-list">
                    <div className="status__card-left">Размер</div>
                    <div className="status__card-right">{orderDetails.size ? orderDetails.size : "Универсальный"}</div>
                </div>
                <div className="status__card-list">
                    <div className="status__card-left">Цена</div>
                    <div className="status__card-right">{orderDetails.price} ₽</div>
                </div>

            </div>
        </div>
    );
};

export default StatusProductsCard;