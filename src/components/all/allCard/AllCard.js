import CardItem from "../../card/card-helpers/CardItem";

const AllCard = ({products, search}) => {
    let filteredProducts = []
    if (search) {
        filteredProducts = products.filter(product => {
            return product.title.toLowerCase().includes(search.toLowerCase())
        })

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
                        backgroundcolor={item.backgroundcolor}
                    />
                })}
            </div>
        )
    } else {

        return (
            <div className="all__card">
                {products.map(item => {
                    return <CardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.description}
                        image={item.image}
                        isLogo={item.isLogo}
                        color={item.color}
                        backgroundcolor={item.backgroundcolor}
                    />
                })}
            </div>
        )
    }
}

export default AllCard