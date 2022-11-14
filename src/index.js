import React, {useLayoutEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, useLocation} from "react-router-dom";
import {persist, store} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import AppContainer from "./AppContainer";

const Wrapper = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [location.pathname])
    return children
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Wrapper>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persist}>
                    <AppContainer />
                </PersistGate>
            </Provider>
        </Wrapper>
    </BrowserRouter>
);
