import './header.scss'
import logo from '../../assets/image/logo/header_logo.svg'

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="Union logo"/>
        </div>
    )
}

export default Header;