import '../cart.scss'
import {Link} from "react-router-dom";

const CartHeader = ({myCart, availableBuy}) => {
    const price = myCart.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity
    }, 0)

    return (
        <div className="cart__header">
            <h1 className="cart__header-title">Общая сумма корзины {price} ₽.</h1>
            <div className='cart__header-desc'>Бесплатная доставка</div>
            {availableBuy
                ? <Link style={{ textDecoration: "none"}} to="/delivery-method">
                    <button className="cart__header-button">Оформить заказ</button>
                </Link>
                : <div style={{marginBottom: "40px"}}/>
            }

            <div className="cart__header-line"/>
        </div>
    )
}

export default CartHeader;