import React from 'react';
import '../../../Styles/pagination.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";

const PaginationControls = () => {
    const pageStore = BookPaginationStorage();

    return (
        <div className="container">
            <div className="row">
                <div className="col text-start">
                    <button className="btn" onClick={pageStore.decrementPage}>
                        Back
                    </button>
                </div>
                <div className="col" id="pageNumber">
                    {pageStore.page}/{pageStore.pageMax}
                </div>
                <div className="col text-end">
                    <button className="btn" onClick={pageStore.incrementPage}>
                        Forward
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;
