import React from "react";
import {useNavigate} from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate();
    const handleGoToProducts = () => {
        navigate("/products");
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="text-center fs-1 mb-3">
            Your Cart is empty
        </div>
        <button className="btn btn-primary w-25" onClick={handleGoToProducts}>
            Go to Products
        </button>
    </div>
    )
}
export default EmptyCart;