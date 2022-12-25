import React from 'react';
import StatusProductsCard from "./StatusProductsCard";

const StatusProducts = ({orderProducts}) => {

    return (
        <div className="status__product">
            <div className="status__product-content">
                <div className="status__product-count">{orderProducts.length} товара</div>

                {orderProducts.map((order, i) => <StatusProductsCard key={i} orderDetails={order}/> )}

            </div>
        </div>
    )


};

export default StatusProducts;