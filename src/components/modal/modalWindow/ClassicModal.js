import vk from "../../../assets/image/login/vk.svg";
import google from "../../../assets/image/login/google.svg";
import yandex from "../../../assets/image/login/yandex.svg";
import union from "../../../assets/image/login/union.svg";

const ClassicModal = ({setModalActive, setUnionId}) => {

    const authByVk = () => {
        window.open('http://localhost:8080/auth/vkontakte', '_self')
        setModalActive(false)
    }

    const authByGoogle = () => {
        window.open('http://localhost:8080/auth/google', '_self')
        setModalActive(false)
    }

    const authByYandex = () => {
        window.open('http://localhost:8080/auth/yandex', '_self')
        setModalActive(false)
    }

    const authByUnionId = () => {
        setUnionId(true)
    }

    return (
        <div className="modal__info">
            <h4 className="modal__info-title">Введите почту и пароль</h4>
            <p className="modal__info-desc">Если у вас нет аккаунта, то введите свой адрес электронной почты
                и придумайте пароль</p>
            <form>
                <input type="email" className="modal__info-input" name="email" placeholder="Введите email"/>
                <input type="password" className="modal__info-input" name="password"
                       placeholder="Введите пароль"/>
                <button className="modal__info-button" type="submit">Войти</button>
            </form>
            <div className="modal__info-or">
                <span>или</span>
            </div>
            <div className="modal__login">
                <div className="modal__login-item" onClick={authByVk}>
                    <img src={vk} alt="login vk"/>
                </div>
                <div className="modal__login-item" onClick={authByGoogle}>
                    <img src={google} alt="login google"/>
                </div>
                <div className="modal__login-item" onClick={authByYandex}>
                    <img src={yandex} alt="login yandex"/>
                </div>
                <div className="modal__login-item" onClick={authByUnionId}>
                    <img src={union} alt="login union"/>
                </div>
            </div>
        </div>
    )
}

export default ClassicModal;