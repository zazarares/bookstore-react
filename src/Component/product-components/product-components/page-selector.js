import React from 'react';
import '../../../Styles/pagination.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";

const PaginationControls = () => {
    const bookPaginationStorage = useBookPaginationStorage();

    return (
        <div className="container">
            <div className="row">
                <div className="col text-start">
                    <button className="btn" onClick={bookPaginationStorage.decrementPage}>
                        Back
                    </button>
                </div>
                <div className="col-1" id="pageNumber" >
                    {bookPaginationStorage.page}/{bookPaginationStorage.pageMax}
                </div>
                <div className="col text-end">
                    <button className="btn" onClick={bookPaginationStorage.incrementPage}>
                        Forward
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;
