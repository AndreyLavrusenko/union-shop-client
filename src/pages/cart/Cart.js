import CartHeader from "../../components/cart/cart-header/CartHeader";
import '../../components/cart/cart.scss'
import CartItem from "../../components/cart/cart-item/CartItem";
import {useEffect, useState} from "react";
import {cartAPI} from "../../api/api";
import Preloader from "../../common/Preloader";

const Cart = ({setRerenderCart, rerenderCart}) => {
    const [myCart, setMyCart] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getCartHandler = async () => {
            setLoading(true)
            const {result} = await cartAPI.getCart()
            setMyCart(result)
            setLoading(false)
        }
        getCartHandler()
    }, [rerenderCart])


    const handleDelete = async (id) => {
        setRerenderCart(!rerenderCart)
        await cartAPI.deleteItemFromCart(id)
    }


    if (loading) return <Preloader />

    return (
        <div className="cart__main">
            <CartHeader myCart={myCart}/>
            {myCart.map((item, i) => (
                <CartItem handleDelete={handleDelete} key={i} cart={item} />
            ))}
        </div>
    )
}


export default Cart