import React, {useState} from 'react';
import App from "./App";

const AppContainer = () => {
    // Кол-во элементов в корзине
    const [quantityState, setQuantityState] = useState(0)

    return (
        <App quantityState={quantityState} setQuantityState={setQuantityState} />
    );
};

export default AppContainer;