import CartHeader from "../../components/cart/cart-header/CartHeader";
import '../../components/cart/cart.scss'
import Preloader from "../../common/Preloader";
import CartLetter from "../../components/cart/cart-letter/CartLetter";
import CartCheque from "../../components/cart/cart-cheque/CartCheque";
import './cart.scss'
import CartItemContainer from "../../components/cart/cart-item/CartItemContainer";



const Cart = ({loading, handleDelete, myCart, availableBuy, plusProductQuantity, minusProductQuantity}) => {

    // if (loading) return <Preloader/>


    return (
        <div className="cart__main">
            <CartHeader myCart={myCart} availableBuy={availableBuy}/>
            <div className="cart__item-wrapper">
                {myCart.map((item, i) => (
                    <CartItemContainer
                        availableBuy={availableBuy}
                        handleDelete={handleDelete}
                        minusProductQuantity={minusProductQuantity}
                        plusProductQuantity={plusProductQuantity}
                        key={i}
                        cart={item}/>
                ))}
                <CartLetter/>
                <CartCheque availableBuy={availableBuy} myCart={myCart}/>
            </div>
        </div>
    )
}


export default Cart