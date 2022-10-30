import './style/global.scss'
import './style/normalize.scss'
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import {Routes, Route} from "react-router-dom";

function App() {
    const isAuth =  false;
    return (
        <div className="wrapper">
            <Header/>
            <div className='container'>
                <div className="main">
                    <Navbar isAuth={isAuth}/>
                    <Routes>

                    </Routes>
                </div>
            </div>
            {/*<Footer/>*/}
        </div>

    );
}

export default App;
