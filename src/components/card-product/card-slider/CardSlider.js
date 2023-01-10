import './cardSlider.scss'
import {useState} from "react";

const CardSlider = ({images, image, title, background}) => {
    const [activeImg, setActiveImg] = useState([])


    const images_arr = JSON.parse(images)

    const getNewImg = e => {
        setActiveImg(e.target.src)
    }

    return (
        <div className="cardslider">
            <div className="cardslider__main" style={{backgroundColor: background}}>
                {/*Главная картинка images*/}
                <img className="cardslider__main-img" src={activeImg.length > 0 ? activeImg : process.env.REACT_APP_BACK_URI + image} alt={title} />
            </div>
            {/*Картинки из массива*/}
            <div className="cardslider__down">
                <div className="cardslider__down-item">
                    <img onClick={getNewImg} className="cardslider__down-img" src={process.env.REACT_APP_BACK_URI + image} alt={title} />
                </div>

                {images_arr.map((item, i) => (
                    <div key={i} className="cardslider__down-item">
                        <img onClick={getNewImg} className="cardslider__down-img" src={process.env.REACT_APP_BACK_URI + item.trim()} alt=""/>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CardSlider;