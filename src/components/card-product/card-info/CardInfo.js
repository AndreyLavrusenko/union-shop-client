import './cardInfo.scss'
import {useEffect, useState} from "react";
import Preloader from "../../../common/Preloader";
import CardToggle from "./card-toggle/CardToggle";
import {useDispatch, useSelector} from "react-redux";
import {cartAPI} from "../../../api/api";


const CardInfo = ({productData, productInfo}) => {
    const dispatch = useDispatch()
    const {isLoading, error} = useSelector(state => state.cart)


    const sizeImg = productData.sizeImg.split(',')

    // Изначальный размер
    const [activeSize, setActiveSize] = useState(productInfo[0].size)
    const [activeColor, setActiveColor] = useState(null)

    // Массив для цветов
    // const [colorArr, setColorArr] = useState([])
    const colorArr = []
    const [loading, setLoading] = useState(true)

    const [showColor, setShowColor] = useState(null)
    const [showSize, setShowSize] = useState(null)


    useEffect(() => {
        // ОБнуляем выбранный цвет
        setActiveColor(null)

        // Записываем в массив товары, которые подходят по размеру
        productInfo.find(item => {
            if (item.size === activeSize) {
                colorArr.push(item)
            }
        })

        console.log(colorArr)

        // Проверяет массив, есть ли в нем цвет и размер, если они пустые, то не будут выводиться детали для выбора
        const isColor = productInfo.some(item => item.color !== '')
        const isSize = productInfo.some(item => item.size !== '')
        setShowColor(isColor)
        setShowSize(isSize)

        setLoading(false)
    }, [activeSize])

    console.log(colorArr)


    //TODO: Сделать проверку в аккаунте пользователь или нет

    // Добавление товара в корзину
    const addToCart = async () => {
       // Если для выбора доступен и цвет и размер
       if (showColor && showSize) {
           if (activeColor && activeSize) {
               const price = productData.price
               const id = productData.id

               await cartAPI.setProduct({price, id, color: activeColor, size: activeSize}, dispatch)

               setActiveSize(productInfo[0].size)
               setActiveColor(null)
           }
       }

       // Если для выбора доступен только цвет
       if (showColor && !showSize) {
           if (activeColor) {
               console.log('true')
           }
       }

       // Если для выбора ничего не доступно
       if (!showColor && !showSize) {
           console.log('true')
       }
    }


    if (loading) {
        return <Preloader/>
    }



    return (
        <div className="cardinfo">
            <div className="cardinfo__new">{productData.isNew ? "Новинка" : null}</div>
            <div className="cardinfo__title">{productData.title}</div>
            <div className="cardinfo__desc">{productData.description}</div>
            <div className="cardinfo__price">{productData.price} ₽</div>

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
                                onClick={() => setActiveSize(item)}
                            >{item}</div>
                        })}

                    </div>
                </div>
            }

            {/* Если у товара нет цвета, то ничего не выводит */}
            {!showColor
                ? null
                : <>
                    <div className="cardinfo__color">Цвет</div>

                    <div className="cardinfo__color-select">
                        {colorArr.map((item, i) => {
                            return <div
                                key={i}
                                className={item.color.trim() === activeColor
                                    ? "cardinfo__color-item active-color"
                                    : "cardinfo__color-item"
                                }
                                style={{backgroundColor: item.color}}
                                onClick={() => setActiveColor(item.color.trim())}
                            />
                        })}
                    </div>
                </>
            }

            <button className="cardinfo__button cardinfo__buy">Купить</button>
            <button onClick={addToCart} className="cardinfo__button cardinfo__cart">{isLoading ? "Добавление..." : "В корзину"}</button>

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
        </div>
    )
}

export default CardInfo