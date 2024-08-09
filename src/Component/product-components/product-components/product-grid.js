import React, {useState, useEffect} from 'react';
import ProductItem from "./product-item";
import bookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
import {fetchBooks} from "../../../api-calls";
import BookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";

function ProductComponent(displayType) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pageStore = bookPaginationStorage();
    const BookSelectedFilterStore = BookSelectedFilterStorage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filter=BookSelectedFilterStore.getFilter();
                const page=pageStore.page;
                const limit=pageStore.limit;
                console.log(filter)
                let filters={}
                for(const key in filter)
                    if(filter[key]!=="")
                        filters[key]=filter[key];
                console.log(filters);
                filters["page"]=page;
                filters["limit"] =limit;
                const result = await fetchBooks(filters); // Assuming fetchBooks returns the entire response
                const books=result.book;
                const numberOfBooks=result.bookNumber;
                pageStore.setMaxPage(Math.ceil(numberOfBooks/pageStore.limit));
                setData(books); // Set the data state with the fetched data
            } catch (error) {
                console.error('Error fetching books:', error);
                setData([]); // Set data to an empty array if there's an error
            }
        };

        fetchData(); // Call the fetch function immediately to load data on page load
    }, [
        BookSelectedFilterStore.name,
        BookSelectedFilterStore.author,
        BookSelectedFilterStore.genre,
        BookSelectedFilterStore.price,
        BookSelectedFilterStore.year,
        pageStore.limit,
        pageStore.page,
        BookSelectedFilterStore.sortBy,
        BookSelectedFilterStore.sortOrder,
    ]);
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {data && data.length > 0 ? (
                    data.map((book, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <ProductItem book={book}/>
                        </div>
                    ))
                ) : (
                    <p>No books found.</p> // Show this if data is empty or null
                )}
            </div>
        </div>
    )
}

export default ProductComponent;