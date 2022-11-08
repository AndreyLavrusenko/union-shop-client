import CardTitle from "./card-helpers/CardTitle";
import CardItem from "./card-helpers/CardItem";
import './card.scss'


const Card = ({products, title, secondTitle}) => {


    return (
        <div className="stripe">
            <CardTitle title={title} secondTitle={secondTitle}/>
            <div className="stripe__slider">
                {products.map(item => {
                    return <CardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.description}
                        image={item.image}
                        isLogo={item.isLogo}
                        color={item.color}
                        backgroundcolor={item.backgroundcolor}/>
                })}
            </div>
        </div>
    )
}

export default Card