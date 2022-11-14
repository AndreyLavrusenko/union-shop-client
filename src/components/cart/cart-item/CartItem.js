import {Link} from "react-router-dom";


const CartItem = ({cart, productCountAvailable, color, handleDelete, product}) => {

    return (
        <div className="cart__info" key={cart.id}>
            <div className="cart__info-wrapper">
                <div className="cart__info-block">
                    <img src={product.image} alt="" className="cart__info-img"/>
                </div>
                <div className="cart__info-main">
                    <div className="cart__info-left">
                        <div className="cart__left">
                            {productCountAvailable < 0
                                ? <Link to={`/product/${cart.productId}`} className="cart__left-title">{product.title}
                                    <span> (нет в наличии)</span></Link>

                                : <Link to={`/product/${cart.productId}`}
                                className="cart__left-title">{product.title}</Link>
                            }

                            <div className="cart__left-desc">{product.description} -</div>
                            <div className="cart__left-desc">{cart.productName}</div>
                            <div className="cart__left-option">
                                {color === ""
                                    ? null
                                    : <div className="cart__left-color" style={{background: color}}/>
                                }
                                {cart.size === ""
                                    ? null
                                    : <div className="cart__left-size">{cart.size}</div>
                                }
                            </div>
                        </div>

                    </div>
                    <div className="cart__info-right">
                        <div className="cart__right">
                            <div
                                className="cart__right-price">{cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}</div>
                            <button
                                className="cart__right-delete"
                                onClick={() => handleDelete(cart.id)}
                            >Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem