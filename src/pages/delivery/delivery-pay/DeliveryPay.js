import React from 'react';
import '../delivery.scss'
import DeliveryPayComponent from "../../../components/create-order/create-pages/DeliveryPayComponent";


const DeliveryPay = ({setQuantityState}) => {
    return (
        <div className="create">
            <DeliveryPayComponent setQuantityState={setQuantityState} />
        </div>
    );
};

export default DeliveryPay;