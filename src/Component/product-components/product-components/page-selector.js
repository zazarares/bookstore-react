import React, {useEffect, useRef} from 'react';
import '../../../Styles/pagination.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
import BookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";

const PaginationControls = () => {
    const pageStore = BookPaginationStorage();
    const BookSelectedFilterStore = BookSelectedFilterStorage();
    const hasMounted = useRef(true);
    useEffect(() => {
            if (hasMounted.current) {
                hasMounted.current=false;
            }
            else{
                pageStore.setPage(1)
            }
        },
        [BookSelectedFilterStore.name, BookSelectedFilterStore.author, BookSelectedFilterStore.genre, BookSelectedFilterStore.year, BookSelectedFilterStore.price])

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
