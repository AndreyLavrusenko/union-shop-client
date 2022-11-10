import '../cart.scss'
import {Link} from "react-router-dom";

const CartHeader = ({myCart}) => {
    const price = myCart.reduce((accumulator, object) => {
        return accumulator + object.price
    }, 0)

    return (
        <>
            <h1 className="cart__header-title">Общая сумма корзины {price} ₽.</h1>
            <div className='cart__header-desc'>Бесплатная доставка</div>
            <Link style={{ textDecoration: "none"}} to="/create-order">
                <button className="cart__header-button">Оформить заказ</button>
            </Link>
            <div className="cart__header-line"/>
        </>
    )
}

export default CartHeader;