import React, {useEffect, useState} from 'react';
import '../../../Styles/product-details.css'
import {fetchBookById} from "../../../api-calls";
const ProductDetails = () => {
    const [book, setBook] = useState({});
    useEffect(()=>{
        const id=window.location.href.split("/")[4];
        const loadBooks=async()=> {
            const result = await fetchBookById(id)
            setBook(result.book[0])
            console.log(book.name)
        }
        loadBooks();
    },[])
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="container">
            <div className="back-button">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/205/875/small/backward-arrow-icon-free-vector.jpg"
                    alt="Back"
                    className="img-thumbnail"
                    onClick={handleBack}
                />
            </div>

            <div className="book-details">
                <div className="card">
                    <div className="card-content">
                        <div className="book-cover">
                            <img src={book.url} alt="Book Cover" className="img-fluid rounded-start"/>
                        </div>
                        <div className="book-info">
                            <h1 className="card-title">{book.name}</h1>
                            <p className="card-text"><strong>Author:</strong>{book.author}</p>
                            <p className="card-text"><strong>Genre:</strong>{book.genre}</p>
                            <p className="card-text"><strong>Year:</strong>{book.year}</p>
                            <p className="card-text"><strong>Price:</strong>{book.price} RON</p>
                            <button className="btn">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
