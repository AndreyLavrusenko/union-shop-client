import './style/global.scss'
import './style/normalize.scss'
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {authAPI, systemAPI} from "./api/api";
import {useDispatch, useSelector} from "react-redux";
import Home from "./pages/home/Home";

function App() {
    // Получаем из стора текущего пользователя
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const [copyright, setCopyright] = useState(null)

    // Если пользователя нет, то делаем запрос на сервер и получаем его токен
    useEffect(() => {
        const getUserLogin = async () => {
            if (!user) {
                await authAPI.loginByThirdPartyService(dispatch)
            }
        }
        getUserLogin()

        const getCopyright = async () => {
            const data = await systemAPI.getCopyright()
            setCopyright(data.copyright)
        }
        getCopyright()
    }, [user]);


    return (
        <div className="wrapper">
            <Header/>
            <div className='container'>
                <div className="main">
                    <Navbar isAuth={user}/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>
            </div>
            <Footer copyright={copyright}/>
        </div>

    );
}

export default App;
