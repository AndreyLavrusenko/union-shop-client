import CartHeader from "../../components/cart/cart-header/CartHeader";
import '../../components/cart/cart.scss'
import CartItem from "../../components/cart/cart-item/CartItem";
import Preloader from "../../common/Preloader";
import CartLetter from "../../components/cart/cart-letter/CartLetter";
import CartCheque from "../../components/cart/cart-cheque/CartCheque";
import './cart.scss'
import CartItemContainer from "../../components/cart/cart-item/CartItemContainer";
import {useEffect} from "react";
import {productAPI} from "../../api/api";


const Cart = ({loading, handleDelete, myCart, changeAvailable, availableBuy, productCount}) => {

    if (loading) return <Preloader/>

    return (
        <div className="cart__main">
            <CartHeader myCart={myCart} availableBuy={availableBuy}/>
            <div className="cart__item-wrapper">
                {myCart.map((item, i) => (
                    <CartItemContainer
                        availableBuy={availableBuy}
                        changeAvailable={changeAvailable}
                        handleDelete={handleDelete}
                        productCount={productCount}
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