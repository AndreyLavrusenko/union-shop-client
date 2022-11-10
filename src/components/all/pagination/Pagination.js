import ReactPaginate from 'react-paginate'

const Pagination = ({pages, changePage, loading}) => {

    return (
        <div className="pagination" style={loading ? {visibility: "hidden"} : {visibility: "visible"}}>
            <ReactPaginate
                previousLabel={"Назад"}
                nextLabel={"Вперед"}
                pageCount={pages}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </div>
    )
}

export default Pagination