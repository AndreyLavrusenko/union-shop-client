import {Routes, Route} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Cart from "./pages/cart/Cart";

import './style/global.scss'
import './style/normalize.scss'
import NavbarContainer from "./components/navbar/NavbarContainer";
import HomeContainer from "./pages/home/HomeContainer";
import AllContainer from "./pages/all/AllContainer";
import CardContainer from "./pages/card/CardContainer";
import CartContainer from "./pages/cart/CartContainer";
import {useState} from "react";
import DeliveryMethod from "./pages/delivery-method/DeliveryMethod";
import DeliveryType from "./pages/delivery-type/DeliveryType";
import DeliveryInfo from "./pages/delivery-info/DeliveryInfo";


function App() {
    // Кол-во элементов в корзине
    const [quantityState, setQuantityState] = useState(0)


    return (
        <div className="wrapper">
            <Header/>
            <div className='container'>
                <div className="main">
                    <NavbarContainer quantityState={quantityState} setQuantityState={setQuantityState}/>

                    <Routes>
                        <Route path="/" element={<HomeContainer/>}/>
                        <Route path="/shop" element={<AllContainer/>}/>
                        <Route path="/product/:id" element={<CardContainer setQuantityState={setQuantityState} />}/>
                        <Route path="/cart" element={<CartContainer setQuantityState={setQuantityState} />}/>
                        <Route path="/delivery-method" element={<DeliveryMethod />}/>
                        <Route path="/delivery-type" element={<DeliveryType />}/>
                        <Route path="/delivery-info" element={<DeliveryInfo />}/>
                    </Routes>
                </div>
            </div>
            <Footer/>
        </div>


    );
}

export default App;
