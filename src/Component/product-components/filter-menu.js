import React, {useEffect} from 'react';
import DropDownFilterText from "./drop-down-filters/drop-down-filter-text";
import DropDownSliderFilter from "./drop-down-filters/drop-down-slider-filter";
import DropDownCheckbox from "./drop-down-filters/drop-down-checkbox";
import bookSelectedFilterStorage from "../../storage/book-stores/book-selected-filter-storage";
import DynamicBookFilterStorage from "../../storage/book-stores/book-dynamic-filter-storage";
import {fetchFilters} from "../../api-calls"
import Selector from "./drop-down-filters/selector";
import BookPaginationStorage from "../../storage/book-stores/book-pagination-storage";
const FilterMenu = () => {
    const DynamicBookFilterStore = DynamicBookFilterStorage();
    const selectedFiltersStore= bookSelectedFilterStorage();
    const pageStore=BookPaginationStorage();
    const authors = DynamicBookFilterStore.authors;
    const genres = DynamicBookFilterStore.genres;
    const getFilterData = async () => {

        try {
            const data = await fetchFilters();
            DynamicBookFilterStore.updateAuthors(data.authors);
            DynamicBookFilterStore.updateGenres(data.genres);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{getFilterData()}, []);

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
            <Selector options={[6,12]} type={"elementsPerPage"} initialValue={6}></Selector>
            <Selector options={["asc","desc"]} type={"sortOrder"} initialValue={"asc"}></Selector>
            <button onClick={resetFilters}>Reset Filters</button>
        </div>
        <div>FilterNumber: {selectedFiltersStore.filterCount}</div>
        </div>
    );
};

export default FilterMenu;
