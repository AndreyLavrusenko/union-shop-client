import preloader from '../assets/image/service/spinner_blue.svg'

const preloaderStyle = {
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}

const Preloader = () => {
    return (
        <img style={preloaderStyle} src={preloader} alt="Preloader"/>
    )
}

export default Preloader;