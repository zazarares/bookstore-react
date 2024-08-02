import React, { useState, useEffect } from 'react';
import ProductItem from "./product-item";
import axios from "axios";
//require('dotenv').config();
function ProductComponent(filterValue,displayType) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log(filterValue)
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3001/books/filter?limit=26&sortBy=year&sortOrder=desc",{params: filterValue.filterValue})
                console.log(response)
                if (response.status!==200) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.data;
                setData(result);
                console.log(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filterValue]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {data.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <ProductItem book={book}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductComponent;