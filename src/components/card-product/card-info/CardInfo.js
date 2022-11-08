import './cardInfo.scss'
import {useEffect, useState} from "react";
import Preloader from "../../../common/Preloader";
import CardToggle from "./card-toggle/CardToggle";
import {addProduct} from "../../../redux/slices/cartSlice";
import {useDispatch} from "react-redux";


const CardInfo = ({productData, productInfo}) => {
    const dispatch = useDispatch()

    const sizeImg = productData.sizeImg.split(',')
    // Изначальный размер
    const [activeSize, setActiveSize] = useState(productInfo[0].size)
    const [activeColor, setActiveColor] = useState(null)

    // Массив для цветов
    const [colorArr, setColorArr] = useState([])
    const [loading, setLoading] = useState(true)

    const [showColor, setShowColor] = useState(null)
    const [showSize, setShowSize] = useState(null)

    useEffect(() => {
        // ОБнуляем выбранный цвет
        setActiveColor(null)
        // Получем товар по размеру
        const color_arr = productInfo.find(item => item.size === activeSize)
        // Выбираем цвета, доступные этому размеру и добавляем их в массив
        const newColorArr = color_arr.color.split(',')
        // Массив цветов записываем с state
        setColorArr(newColorArr)

        // Проверяет массив, есть ли в нем цвет и размер, если они пустые, то не будут выводиться детали для выбора
        const isColor = productInfo.some(item => item.color !== '')
        const isSize = productInfo.some(item => item.size !== '')
        setShowColor(isColor)
        setShowSize(isSize)

        setLoading(false)
    }, [activeSize])


    //TODO: Сделать проверку в аккаунте пользователь или нет

    // Добавление товара в корзину
    const addToCart = () => {
       // Если для выбора доступен и цвет и размер
       if (showColor && showSize) {
           if (activeColor && activeSize) {
               const price = productData.price
               const id = productData.id

               dispatch(addProduct({price, id, color: activeColor, size: activeSize}))
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

            {/* Если у товара нет цвета, то ничего не выводит */}
            {!showColor
                ? null
                : <>
                    <div className="cardinfo__color">Цвет</div>

                    <div className="cardinfo__color-select">
                        {colorArr.map((color, i) => {
                            return <div
                                key={i}
                                className={color.trim() === activeColor
                                    ? "cardinfo__color-item active-color"
                                    : "cardinfo__color-item"
                                }
                                style={{backgroundColor: color}}
                                onClick={() => setActiveColor(color.trim())}
                            />
                        })}
                    </div>
                </>
            }

            {/* Если у товара нет размера, то ничего не выводит */}
            {!showSize
                ? null
                : <div>
                    <div className="cardinfo__color">Размер</div>

                    <div className="cardinfo__color-select">
                        {productInfo.map((item, i) => {
                            return <div
                                key={i}
                                className={item.size === activeSize
                                    ? "cardinfo__size-item active-size"
                                    : "cardinfo__size-item"
                                }
                                onClick={() => setActiveSize(item.size)}
                            >{item.size}</div>
                        })}

                    </div>
                </div>
            }

            <button className="cardinfo__button cardinfo__buy">Купить</button>
            <button onClick={addToCart} className="cardinfo__button cardinfo__cart">В корзину</button>

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