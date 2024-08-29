import React, {useEffect} from 'react';
import '../../../Styles/pagination.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";

const PageNavigationControls = () => {
    const bookPaginationStorage = useBookPaginationStorage();

    useEffect(() => {
        bookPaginationStorage.setPage(Math.min(bookPaginationStorage.page, bookPaginationStorage.pageMax));
    }, [bookPaginationStorage.pageMax]);

    return (
        <div className="container">
            <div className="row">
                <div className="col text-start">
                    <button className="btn" onClick={bookPaginationStorage.decrementPage}>
                        Back
                    </button>
                </div>
                <div className="col-1" id="pageNumber">
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

export default PageNavigationControls;
