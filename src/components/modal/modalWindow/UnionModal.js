import {authAPI} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

const UnionModal = ({setUnionId, setModalActive}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {isLoading, unionError} = useSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const singUpByUnion = async (e) => {
        e.preventDefault();

        try {
            const res = await authAPI.loginByUnionId(dispatch, {email, password})
            if (res.resultCode === 0) {
                setModalActive(false)
                // window.location.replace(window.location.href)
            }
        } catch (err) {}

    }

    return (
        <div className="modal__info modal__info-union">
            <h4 className="modal__info-title">Войти с Union ID</h4>
            <p className="modal__info-desc">Введите свой логин и пароль от аккаунта UnionUniverse</p>
            <form>
                <input
                    type="email"
                    className="modal__info-input"
                    name="email"
                    placeholder="Введите email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="modal__info-input"
                    name="password"
                    placeholder="Введите пароль"
                    onChange={e => setPassword(e.target.value)}
                />
                <a href="https://unionuniverse.one/content/login/login-start.php" className="modal__info-link">Не помню
                    пароль</a>
                <p className="modal__info-error">{unionError && "Неверный логин или пароль"}</p>
                <button
                    className="modal__info-button"
                    type="submit"
                    disabled={isLoading}
                    onClick={singUpByUnion}>
                    {isLoading ? "Загрузка..." : "Войти"}
                </button>
                <a href="https://unionuniverse.one/content/login/reg.php">
                    <button
                        type="button"
                        className="modal__info-button modal__info__button-link">
                        Создать Union ID
                    </button>
                </a>
            </form>
            <p className="modal__info-back" onClick={() => setUnionId(false)}>Вернуться назад</p>
        </div>
    )
}

export default UnionModal