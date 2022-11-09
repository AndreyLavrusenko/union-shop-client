import arrow from '../../../../assets/image/icon/arrow_down.svg'
import {useState} from "react";

const CardToggle = ({data, title}) => {
    // Открыты или закрыты блоки с информацией
    const [block, setBlock] = useState(false)

    const string = data.split(';')

    if (data.length > 1) {
        return (
            <>
                <div className="cardinfo__toggle" onClick={() => setBlock(!block)}>
                    <div className="cardinfo__toggle-title">{title}</div>
                    <img style={block ? {transform: "rotate(180deg)"} : null} src={arrow} alt="open"/>
                </div>
                {block ?
                    <div className="cardinfo__toggle-text">
                        {string.map((item, i) => {
                            return <div key={i}>{item}; <br/></div>
                        })}
                    </div>
                    : null
                }
            </>
        )
    }
}

export default CardToggle