import React, {useEffect, useState} from 'react';
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
import useBookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";
import useBookStorage from "../../../storage/book-stores/book-storage";
import {reloadBookCache} from "../../../utils";
import ProductItem from "./product-item";
import LoadingPage from "../../loading-page";

function ProductGrid({displayType}) {

    const bookPaginationStorage = useBookPaginationStorage();
    const bookSelectedFilterStore = useBookSelectedFilterStorage();
    const bookStore = useBookStorage();
    const [booksArray, setBooksArray] = useState([])

    useEffect(() => {
        if (bookPaginationStorage.page > 0)
            reloadBookCache();
    }, [bookSelectedFilterStore.filter, bookPaginationStorage.page, bookPaginationStorage.limit]);

    useEffect(() => {
        if (bookStore.bookList.size > 0)
            setBooksArray(Array.from(bookStore.bookList.values()));
        else
            setBooksArray([]);
    }, [bookStore.bookList]);

    return (
        <div className="container-fluid mt-5">
            <div className={displayType ? "row" : "list-view"}>  {/* Conditional class based on displayType */}
                {booksArray.length > 0 ? (
                    booksArray.map((book, index) => (
                        <div
                            className={displayType ? "col-md-4 mb-4" : "col-12 mb-4"}  // Change layout based on displayType
                            key={index}
                        >
                            <ProductItem
                                book={book}
                                displayAddToCartButton={true}
                            />
                        </div>
                    ))
                ) : (
                    <LoadingPage/>
                )}
            </div>
        </div>
    );
}

export default ProductGrid;