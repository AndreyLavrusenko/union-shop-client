import React from 'react';

const StatusInfo = ({orderId, orderStatus}) => {
    switch (orderStatus) {
        case 'performed':
            orderStatus = 'Выполняется'
            break;
        case 'sent':
            orderStatus = 'Отправлено'
            break;
        case 'delivered':
            orderStatus = 'Доставлено'
            break;
    }


    return (
        <div className="status__info">
            <div className="status__info-title">Заказ {orderId}</div>
            <div className="status__info-subtitle">{orderStatus}</div>
        </div>
    );
};

export default StatusInfo;