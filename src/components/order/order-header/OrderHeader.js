import React from 'react';


const OrderHeader = ({title, subtitle}) => {
    return (
        <div className="order__header">
            <div className="order__header-title">{title}</div>
            <div className="order__header-subtitle">{subtitle}</div>
        </div>
    );
};

export default OrderHeader;