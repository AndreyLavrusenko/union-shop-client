import './modal.scss'
import logo from '../../assets/image/logo/header_logo.svg'
import {useState} from "react";
import UnionModal from "./modalWindow/UnionModal";
import ClassicModal from "./modalWindow/ClassicModal";

const Modal = ({active, setModalActive}) => {
    const [unionId, setUnionId] = useState(false)


    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setModalActive(false)}
        >
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <img className="modal__header-logo" src={logo} alt="logo"/>
                    <div
                        className="modal__header-close"
                        onClick={() => setModalActive(false)}
                    />
                </div>
                {unionId
                    ? <UnionModal setModalActive={setModalActive} setUnionId={setUnionId}/>
                    : <ClassicModal setModalActive={setModalActive} setUnionId={setUnionId}/>
                }
            </div>
        </div>
    )
}

export default Modal;