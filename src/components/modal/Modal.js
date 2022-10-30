import './modal.scss'
import logo from '../../assets/image/logo/header_logo.svg'

const Modal = ({active, setModalActive}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setModalActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <img className="modal__header-logo" src={logo} alt="logo"/>
                </div>
                <div className="modal__info">
                    <h4 className="modal__info-title">Введите почту и пароль</h4>
                    <p className="modal__info-desc">Если у вас нет аккаунта, то введите свой адрес электронной почты и придумайте пароль</p>
                    <form>
                        <input type="email" className="modal__info-input" name="email" placeholder="Введите email"/>
                        <input type="password" className="modal__info-input" name="password" placeholder="Введите пароль"/>
                        <button className="modal__info-button" type="submit">Войти</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Modal;