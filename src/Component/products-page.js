import React, {useState} from 'react';
import FilterMenu from "./product-components/filter-menu";
import ProductGrid from "./product-components/product-components/product-grid";
import PageNavigationControls from "./product-components/product-components/page-navigation"
import "../Styles/product-grid.css"

const ProductsPage = () => {

    const [displayType, setDisplayType] = useState(true);

    const changeDisplayType = () => {
        setDisplayType(prevDisplayType => !prevDisplayType);
    };

    return (
        <div className="grid">
            <FilterMenu/>
            <button onClick={changeDisplayType}> VIEW</button>
            <ProductGrid displayType={displayType}/>
            <PageNavigationControls/>

        </div>
    );
};

export default ProductsPage;
