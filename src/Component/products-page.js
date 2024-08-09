import React, {useEffect, useState} from 'react';
import FilterMenu from "./product-components/filter-menu";
import ProductGrid from "./product-components/product-components/product-grid";
import BookSelectedFilterStorage from "../storage/book-stores/book-selected-filter-storage";
import PageBrowser from "./product-components/product-components/page-selector"
import BookPaginationStorage from "../storage/book-stores/book-pagination-storage";
const ProductsPage = () => {
    const [displayType, setDisplayType] = useState(false);
    const BookSelectedFilterStore=BookSelectedFilterStorage();
    const filterList=BookSelectedFilterStore.getFilter();

    const changeDisplayType = () => {
        setDisplayType(prevDisplayType => !prevDisplayType);
    };

    return (
        <div>
            <FilterMenu />
            <ProductGrid filterList={filterList} displayType={displayType}/>
            <PageBrowser/>

        </div>
    );
};

export default ProductsPage;
