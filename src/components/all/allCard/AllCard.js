import CardItem from "../../card/card-helpers/CardItem";
import FlipMove from "react-flip-move";


const AllCard = ({products, search}) => {
    let filteredProducts = []
    if (search) {
        filteredProducts = products.filter(product => {
            return product.title.toLowerCase().includes(search.toLowerCase())
        })

        // Если есть поисковый запрос
        return (
            <div className="all__card">
                {filteredProducts.map(item => {
                    return <CardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.description}
                        image={item.image}
                        isLogo={item.isLogo}
                        color={item.color}
                        subColor={item.subColor}
                        backgroundcolor={item.backgroundcolor}
                    />
                })}
            </div>
        )
    } else {

        // Вывод всех карточек
        return (
            <FlipMove className="all__card">
                {products.map(item => {
                    return <CardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.description}
                        image={item.image}
                        isLogo={item.isLogo}
                        color={item.color}
                        subColor={item.subColor}
                        backgroundcolor={item.backgroundcolor}
                    />
                })}
            </FlipMove>
        )
    }
}

export default AllCard