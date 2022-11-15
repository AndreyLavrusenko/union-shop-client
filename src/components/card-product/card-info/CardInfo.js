import './cardInfo.scss'
import {useEffect, useState} from "react";
import Preloader from "../../../common/Preloader";
import CardToggle from "./card-toggle/CardToggle";
import {useDispatch, useSelector} from "react-redux";
import {cartAPI} from "../../../api/api";
import Modal from "../../modal/Modal";
import 'animate.css';
import {useNavigate} from "react-router-dom";


const CardInfo = ({productData, productInfo, isAuth, setRerenderCart, rerenderCart}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {isLoading, error} = useSelector(state => state.cart)

    const sizeImg = productData.sizeImg.split(',')

    // Изначальный размер
    const [activeSize, setActiveSize] = useState(productInfo[0].size)
    const [activeColor, setActiveColor] = useState(productInfo[0].color)

    // Массив для цветов
    const [colorArr, setColorArr] = useState([])
    const [loading, setLoading] = useState(true)

    const [showColor, setShowColor] = useState(null)
    const [showSize, setShowSize] = useState(null)

    const [colorError, setColorError] = useState(false)
    const [modal, setModal] = useState(false)


    let price = null
    let title_product = ''


    useEffect(() => {
        // ОБнуляем выбранный цвет

        setActiveColor(productInfo[0].color);
        colorArr.length = 0;
        title_product = '';

        // Проверяет массив, есть ли в нем цвет и размер, если они пустые, то не будут выводиться детали для выбора
        const isColor = productInfo.some(item => item.color !== '')
        const isSize = productInfo.some(item => item.size !== '')
        setShowColor(isColor)
        setShowSize(isSize)

        setLoading(false)

    }, [activeSize])


    // При смене размера записыавет в массив новые цвета
    const setNewColorArr = () => {
        colorArr.length = 0

        if (!showSize) {
            productInfo.map(item => colorArr.push(item))
        } else {
            productInfo.find(item => {
                if (item.size === activeSize) {
                    colorArr.push(item)
                }
            })
        }

        return colorArr
    }

    setNewColorArr()

    // Меняет цену взависимоти от цвета и размера
    const setPriceHandler = () => {
        if (showSize && showColor) {
            if (activeColor && activeSize) {
                productInfo.map(item => {
                    if (item.color === activeColor && item.size === activeSize) {
                        price = item.price
                    }
                })
            }
        }

        if (showColor && !showSize) {
            if (activeColor) {
                productInfo.map(item => {
                    if (item.color === activeColor) {
                        price = item.price
                    }
                })
            }
        }

        if (!showColor && !showSize) {
            productInfo.map(item => {
                price = item.price
            })
        }

    }

    setPriceHandler()



    // Добавление товара в корзину
    const addToCart = async () => {
        if (!isAuth) {
            setModal(true)
        }
        // Если для выбора доступен и цвет и размер
        if (showColor && showSize) {
            if (activeColor && activeSize) {
                const id = productData.id
                const name = title_product.title_product

                await cartAPI.setProduct({name, price, id, color: activeColor,  size: activeSize}, dispatch)

                setActiveSize(productInfo[0].size)
                setActiveColor(null)
                setColorError(false)
            } else {
                setColorError(true)
            }
        }

        // Если для выбора доступен только цвет
        if (showColor && !showSize) {
            if (activeColor) {
                const id = productData.id
                const name = title_product.title_product

                await cartAPI.setProduct({name, price, id, color: activeColor, size: activeSize}, dispatch)

                setActiveSize(productInfo[0].size)
                setActiveColor(null)
                setColorError(false)
            } else {
                setColorError(true)
            }
        }

        // Если для выбора ничего не доступно
        if (!showColor && !showSize) {
            const id = productData.id
            const name = title_product.title_product


            await cartAPI.setProduct({name, price, id, color: activeColor, size: activeSize}, dispatch)

            setActiveColor(null)
            setColorError(false)
        }

        setRerenderCart(!rerenderCart)
    }


    if (loading) {
        return <Preloader/>
    }



    if (showColor) {
        if (activeColor) {
            try {
                title_product = productInfo.find(item => {
                    if (item.color === activeColor && item.size === activeSize) return item
                })
            } catch (err) {
                title_product = ""
            }
        }
    } else {
        title_product = productInfo[0]
    }



    return (
        <div className="cardinfo">
            <div className="cardinfo__new">{productData.isNew ? "Новинка" : null}</div>
            <div className="cardinfo__title">{productData.title}</div>
            <div className="cardinfo__desc">{productData.description} -</div>
            <div
                className="cardinfo__desc-title"
                style={title_product ? {opacity: 1} : {opacity: 0}}>
                {title_product ? title_product.title_product : "-------"}
            </div>

            {/* Вывод цены */}
            <div
                className="cardinfo__price"
                style={price ? {opacity: 1} : {opacity: 0}}
            >
                {price
                    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
                    : "-------"
                }
            </div>

            {/* Если у товара нет размера, то ничего не выводит */}
            {!showSize
                ? null
                : <div>
                    <div className="cardinfo__color">Размер</div>

                    <div className="cardinfo__color-select">
                        {[...new Set(productInfo.map(item => item.size))].map((item, i) => {
                            return <div
                                key={i}
                                className={item === activeSize
                                    ? "cardinfo__size-item active-size"
                                    : "cardinfo__size-item"
                                }
                                onClick={() => {
                                    setActiveSize(item)
                                    setNewColorArr()
                                }}
                            >{item}</div>
                        })}
                    </div>
                </div>
            }

            {/* Если у товара нет цвета, то ничего не выводит */}
            {!showColor
                ? null
                : <>
                    <div
                        className={colorError
                            ? "cardinfo__color animate__animated animate__shakeX"
                            : "cardinfo__color animate__animated"
                        }
                        style={colorError
                            ? {color: "#D62E20"}
                            : {color: "black"}}
                    >Цвет
                    </div>

                    <div className="cardinfo__color-select">
                        {colorArr.map((item, i) => {
                            return <div
                                key={i}
                                className={item.color.trim() === activeColor
                                    ? "cardinfo__color-item active-color"
                                    : "cardinfo__color-item"
                                }
                                style={{backgroundColor: item.color}}
                                onClick={() => {
                                    setActiveColor(item.color.trim())
                                    setPriceHandler()
                                }}
                            />
                        })}
                    </div>
                </>
            }


            <button
                className="cardinfo__button cardinfo__buy"
                onClick={() => {
                    addToCart()
                    if (isAuth) navigate('/cart')
                }}
            >Купить
            </button>
            <button
                onClick={addToCart}
                disabled={isLoading}
                className="cardinfo__button cardinfo__cart">{isLoading ? "Добавление..." : "В корзину"}
            </button>
            <div className="cardinfo__button-error" style={error ? {display: "block"} : {display: "none"}}>Произошла
                ошибка
            </div>

            <CardToggle title="О товаре" data={productData.about}/>
            <CardToggle title="Рекомендации по уходу" data={productData.recommend}/>
            <CardToggle title="Размерная сетка" data={productData.sizeGrid}/>

            <div className="cardinfo__horizontal"/>

            {/* Картинки с размерами */}
            <div className="cardinfo__size">
                {sizeImg.map((item, i) => (
                    <div key={i}>
                        <img src={item} alt="" className="cardinfo__size-img"/><br/>
                    </div>
                ))}
            </div>
            <Modal active={modal} setModalActive={setModal}/>
        </div>

    )
}

export default CardInfo