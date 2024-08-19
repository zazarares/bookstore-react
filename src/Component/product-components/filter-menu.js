import React, {useEffect} from 'react';
import DropDownFilterText from "./drop-down-filters/drop-down-filter-text";
import DropDownSliderFilter from "./drop-down-filters/drop-down-slider-filter";
import DropDownCheckbox from "./drop-down-filters/drop-down-checkbox";
import bookSelectedFilterStorage from "../../storage/book-stores/book-selected-filter-storage";
import BookFilterStorage from "../../storage/book-stores/book-filter-storage";
import {fetchFilters} from "../../api-calls"
import Selector from "./drop-down-filters/selector";
import BookPaginationStorage from "../../storage/book-stores/book-pagination-storage";
const FilterMenu = () => {

    const bookFilterStore = BookFilterStorage();
    const selectedFiltersStore= bookSelectedFilterStorage();
    const pageStore=BookPaginationStorage();
    const authors = bookFilterStore.authors;
    const genres = bookFilterStore.genres;

    const getFilterData = async () => {

        try {
            const data = await fetchFilters();
            bookFilterStore.updateAuthors(data.authors);
            bookFilterStore.updateGenres(data.genres);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        getFilterData()
    }, []);

    const resetFilters=()=>{
        selectedFiltersStore.removeAllFilters();
        pageStore.setPage(1);
    }

    return (
        <div>
        <div className="filter-menu-sidebar">
            <DropDownFilterText field={"name"} />
            <DropDownSliderFilter field={"year"} min={1900} max={2024} />
            <DropDownSliderFilter field={"price"} min={0} max={100}/>
            <DropDownCheckbox field={"author"} data={authors} />
            <DropDownCheckbox field={"genre"} data={genres} />
            <Selector></Selector>
            <button onClick={resetFilters}>Reset Filters</button>
        </div>
        <div>FilterNumber: {selectedFiltersStore.filterCount}</div>
        </div>
    );
};

export default FilterMenu;
