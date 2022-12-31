import '../cart.scss'
import {Link, NavLink} from "react-router-dom";

const CartHeader = ({myCart, availableBuy}) => {
    const price = myCart.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity
    }, 0)

    return (
        <div className="cart__header">
            <h1 className="cart__header-title">Общая сумма корзины <span>{price} ₽.</span></h1>
            <div className='cart__header-desc'>Бесплатная доставка</div>
            {availableBuy
                ? <Link style={{ textDecoration: "none"}} to="/delivery-method">
                    <button className="cart__header-button">Оформить заказ</button>
                </Link>
                : <button style={{ textDecoration: "none", backgroundColor: "#0707e1", cursor: "not-allowed"}} className="cart__header-button" >Доступны не все товары</button>
            }

            <div className="cart__header-line"/>
        </div>
    )
}

export default CartHeader;