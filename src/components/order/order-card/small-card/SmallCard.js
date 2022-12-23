import React from 'react';
import 'animate.css'


const SmallCard = ({title, backgroundcolor, color, description, image, subColor, isAnimation = true}) => {

    return (
        <div
            key={Math.floor(Math.random() * (10000 - 1 + 1) + 1)}
            className={'order__small'}
            style={isAnimation ? {animation: '4s ease showCard', backgroundColor: backgroundcolor}: { backgroundColor: backgroundcolor, animation: '4s ease showOneCard'}}
        >
            <div className="order__small-title" style={{color: color}}>{title}</div>
            <div className="order__small-desc" style={{color: subColor}}>{description}</div>
            
            <div className="order__small-img">
                <img src={image} alt={title}/>
            </div>
        </div>
    );
};

export default SmallCard;