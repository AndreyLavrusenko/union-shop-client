const CardTitle = ({title, secondTitle}) => {
    return (
        <div className="stripe__title">
            <div className={"stripe__title-first"}>{title}</div>
            <div className={"stripe__title-second"}>{secondTitle}</div>
        </div>
    )
}

export default CardTitle