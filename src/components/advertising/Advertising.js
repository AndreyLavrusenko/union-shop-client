import './advertising.scss'
import {useEffect, useState} from "react";
import {productAPI} from "../../api/api";


const Advertising = () => {
    const [advertising, setAdvertising] = useState(null)
    const [loading, setLoading] = useState(true)

    // Вывод картинки и текста рекламы
    useEffect(() => {
        const getAdvertisingFunc = async () => {
            const data = await productAPI.getAdvertising()
            setAdvertising(data)
            setLoading(false)
        }
        getAdvertisingFunc()
    }, [])


    return (
        <>
            {
                loading
                    ? null
                    : <div className="advertising">
                        <div className="advertising__wrapper">
                            <div className="advertising__left">
                                <div className="advertising__left-new">Новинка</div>
                                <br/>
                                <div className="advertising__left-title">{advertising.advertising_text}</div>
                            </div>
                            <div className="advertising__right">
                                <img src={advertising.advertising_img} alt=""/>
                            </div>
                        </div>
                    </div>

            }
        </>
    )
}

export default Advertising;