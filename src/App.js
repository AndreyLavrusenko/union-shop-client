import './style/global.scss'
import './style/normalize.scss'
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {authAPI} from "./api/api";
import {useDispatch, useSelector} from "react-redux";

function App() {
    // Получаем из стора текущего пользователя
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    // Если пользователя нет, то делаем запрос на сервер и получаем его токен
    useEffect(() => {
        const getUserLogin = async () => {
            if (!user) {
                console.log('loginByThirdPartyService')
                await authAPI.loginByThirdPartyService(dispatch)
            }
        }
        getUserLogin()
    }, [user]);


    return (
        <div className="wrapper">
            <Header/>
            <div className='container'>
                <div className="main">
                    <Navbar isAuth={user}/>
                    <Routes>

                    </Routes>
                </div>
            </div>
            {/*<Footer/>*/}
        </div>

    );
}

export default App;
