import React, {useState} from 'react';
import FilterMenu from "./product-components/filter-menu";
import ProductGrid from "./product-components/product-components/product-grid";
import BookSelectedFilterStorage from "../storage/book-stores/book-selected-filter-storage";
import PageBrowser from "./product-components/product-components/page-selector"
import "../Styles/product-grid.css"

const ProductsPage = () => {

    const [displayType, setDisplayType] = useState(false);
    const BookSelectedFilterStore=BookSelectedFilterStorage();
    const filterList=BookSelectedFilterStore.filter;

    const changeDisplayType = () => {
        setDisplayType(prevDisplayType => !prevDisplayType);
    };

    return (
        <div className="grid">
            <FilterMenu />
            <ProductGrid filterList={filterList} displayType={displayType}/>
            <PageBrowser/>

        </div>
    );
};

export default ProductsPage;
