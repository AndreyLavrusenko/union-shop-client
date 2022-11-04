import {useState} from "react";

const Search = ({setSearchProduct, setActiveCategory}) => {

    const [localSearch, setLocalSearch] = useState("")

    const onSearchClick = () => {
        setActiveCategory(null)
    }

    return (
        <div className="search">
            <div>
                <input
                    type="text"
                    value={localSearch}
                    onClick={onSearchClick}
                    onChange={e => setLocalSearch(e.target.value)}
                    onBlur={() => setSearchProduct(localSearch)}
                    placeholder="Поиск..."
                />
            </div>
        </div>
    )
}

export default Search;