import React, {useEffect} from 'react';
import DropDownFilterText from "./drop-down-filters/drop-down-filter-text";
import DropDownSliderFilter from "./drop-down-filters/drop-down-slider-filter";
import DropDownCheckbox from "./drop-down-filters/drop-down-checkbox";
import useBookSelectedFilterStorage from "../../storage/book-stores/book-selected-filter-storage";
import useBookFilterStorage from "../../storage/book-stores/book-filter-storage";
import BooksPerPageSelector from "./drop-down-filters/books-per-page-selector";
import useBookPaginationStorage from "../../storage/book-stores/book-pagination-storage";

import {fetchFilters} from "../../api-calls/book-calls";

const FilterMenu = () => {

    const bookFilterStore = useBookFilterStorage();
    const bookSelectedFilterStorage = useBookSelectedFilterStorage();
    const bookPaginationStore = useBookPaginationStorage();
    const authors = bookFilterStore.authors;
    const genres = bookFilterStore.genres;

    const getFilterData = async () => {

        try {
            const filter = bookSelectedFilterStorage.filter;
            let filters = {}

            for (const key in filter)
                if (filter[key] !== "")
                    filters[key] = filter[key];

            const data = await fetchFilters(filters);
            bookFilterStore.updateAuthors(data.authors);
            bookFilterStore.updateGenres(data.genres);

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    useEffect(() => {
        getFilterData()
    }, [bookSelectedFilterStorage.filter]);

    const resetFilters = () => {
        bookSelectedFilterStorage.removeAllFilters();
        bookPaginationStore.setPage(1);
    }

    return (
        <div className="filter-menu mt-2">
            <div className="filter-menu-sidebar">
                <DropDownFilterText field={"name"}/>
                <DropDownSliderFilter field={"year"} min={1900} max={2024}/>
                <DropDownSliderFilter field={"price"} min={0} max={100}/>
                <DropDownCheckbox field={"author"} data={authors}/>
                <DropDownCheckbox field={"genre"} data={genres}/>
                <BooksPerPageSelector></BooksPerPageSelector>
                <button className={"reset-filter-button"} onClick={resetFilters}>Reset Filters</button>
            </div>
            <div>FilterNumber: {bookSelectedFilterStorage.filterCount}</div>
        </div>
    );
};

export default FilterMenu;
