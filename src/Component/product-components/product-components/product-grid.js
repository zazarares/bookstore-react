import React, {useState, useEffect} from 'react';
import ProductItem from "./product-item";
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
import {fetchBooks} from "../../../api-calls";
import useBookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";
function ProductGrid(displayType) {
    const [data, setData] = useState([]);
    const bookPaginationStorage = useBookPaginationStorage();
    const bookSelectedFilterStore = useBookSelectedFilterStorage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filter=bookSelectedFilterStore.filter;
                let filters={}

                for(const key in filter)
                    if(filter[key]!=="")
                        filters[key]=filter[key];

                filters["page"]=bookPaginationStorage.page;
                filters["limit"] =bookPaginationStorage.limit;

                const result = await fetchBooks(filters);

                const books=result.book;
                const numberOfBooks=result.bookNumber;

                bookPaginationStorage.setMaxPage(Math.ceil(numberOfBooks/bookPaginationStorage.limit));

                setData(books);

            } catch (error) {
                console.error('Error fetching books:', error);
                setData([]); // Set data to an empty array if there's an error
            }
        };

        fetchData(); // Call the fetch function immediately to load data on page load
    }, [bookSelectedFilterStore.filter,bookPaginationStorage.page,bookPaginationStorage.limit]);



    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {data && data.length > 0 ? (
                    data.map((book, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <ProductItem book={book} inCart={false}/>
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