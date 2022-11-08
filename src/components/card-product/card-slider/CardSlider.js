import './cardSlider.scss'
import {useState} from "react";

const CardSlider = ({images, image, title}) => {
    const [activeImg, setActiveImg] = useState(image)


    let images_arr = [];
    try {
        images_arr = images.split(',')
    } catch {}


    const getNewImg = e => {
        setActiveImg(e.target.src)
    }


    return (
        <div className="cardslider">
            <div className="cardslider__main">
                {/*Главная картинка images*/}
                <img className="cardslider__main-img" src={activeImg.toString()} alt={title} />
            </div>
            {/*Картинки из массива*/}
            <div className="cardslider__down">
                <div className="cardslider__down-item">
                    <img onClick={getNewImg} className="cardslider__down-img" src={image} alt={title} />
                </div>

                {images_arr.map((item, i) => (
                    <div key={i} className="cardslider__down-item">
                        <img onClick={getNewImg} className="cardslider__down-img" src={item.trim()} alt=""/>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CardSlider;