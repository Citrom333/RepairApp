import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            initialPage={currentPage - 1}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />
    );
};

export default Pagination;

