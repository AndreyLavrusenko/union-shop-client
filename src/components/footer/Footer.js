import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import logo_blue from '../../assets/image/logo/logo_blue.svg'
import vk from '../../assets/image/icon/vk.svg'
import tg from '../../assets/image/icon/telegram.svg'
import yt from '../../assets/image/icon/youtube.svg'
import './footer.scss'
import {systemAPI} from "../../api/api";

const Footer = () => {
    const [copyright, setCopyright] = useState(null)


    // Если пользователя нет, то делаем запрос на сервер и получаем его токен
    useEffect(() => {
        // Получение копирайта
        const getCopyright = async () => {
            const data = await systemAPI.getCopyright()
            setCopyright(data.copyright)
        }
        getCopyright()
    }, []);


    return (
        <div className="footer">
            <div className="footer__wrapper">
                <div className="footer__left">
                    <img src={logo_blue} alt="logo"/><br/>
                    <div className="footer__left-links">
                        <a className="footer__left-link" href="#">
                            <img src={vk} alt=""/>
                        </a>
                        <a className="footer__left-link" href="#">
                            <img src={tg} alt=""/>
                        </a>
                        <a className="footer__left-link" href="#">
                            <img src={yt} alt=""/>
                        </a>
                    </div>
                </div>
                <div className="footer__right">
                    <div className="footer__right-left">
                        <NavLink className="footer__right-link" to={"/"}>Оплата</NavLink><br/>
                        <NavLink className="footer__right-link" to={"/"}>Доставка</NavLink><br/>
                        <NavLink className="footer__right-link" to={"/"}>Публичная Оферта</NavLink>
                    </div>
                    <div className="footer__right-right">
                        <NavLink className="footer__right-link" to={"/"}>Обработка персональных данных</NavLink><br/>
                        <NavLink className="footer__right-link" to={"/"}>Ответы на часто задаваемые вопросы</NavLink><br/>
                        <NavLink className="footer__right-link" to={"/"}>Контакты</NavLink>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">{copyright}</div>
        </div>
    );
}

export default Footer;