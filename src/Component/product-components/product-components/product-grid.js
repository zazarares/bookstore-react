import React, {useEffect, useState} from 'react';
import ProductItem from "./product-item";
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
import useBookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";
import useBookStorage from "../../../storage/book-stores/book-storage";

function ProductGrid(displayType) {
    const [data, setData] = useState([]);
    const bookPaginationStorage = useBookPaginationStorage();
    const bookSelectedFilterStore = useBookSelectedFilterStorage();
    const bookStore = useBookStorage();

    useEffect(() => {
        bookStore.clear();
        bookStore.cacheBooks();
    }, [bookSelectedFilterStore.filter, bookPaginationStorage.page, bookPaginationStorage.limit]);

    useEffect(() => {
        setData(bookStore.bookList);
    }, [bookStore.bookList])

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {data && data.length > 0 ? (
                    data.map((book, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <ProductItem book={book} displayAddToCartButton={false}/>
                        </div>
                    ))
                ) : (
                    <p>No books found.</p> // Show this if data is empty or null
                )}
            </div>
        </div>
    )
}

export default ProductGrid;