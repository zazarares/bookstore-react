import React, {useEffect} from 'react';
import DropDownFilterText from "./drop-down-filters/drop-down-filter-text";
import DropDownSliderFilter from "./drop-down-filters/drop-down-slider-filter";
import DropDownCheckbox from "./drop-down-filters/drop-down-checkbox";
import useBookSelectedFilterStorage from "../../storage/book-stores/book-selected-filter-storage";
import useBookFilterStorage from "../../storage/book-stores/book-filter-storage";
import {fetchFilters} from "../../api-calls"
import Selector from "./drop-down-filters/selector";
import useBookPaginationStorage from "../../storage/book-stores/book-pagination-storage";
const FilterMenu = () => {

    const bookFilterStore = useBookFilterStorage();
    const bookSelectedFilterStorage= useBookSelectedFilterStorage();
    const bookPaginationStore=useBookPaginationStorage();
    const authors = bookFilterStore.authors;
    const genres = bookFilterStore.genres;

    const getFilterData = async () => {

        try {
            const filter=bookSelectedFilterStorage.filter;
            let filters={}

            for(const key in filter)
                if(filter[key]!=="")
                    filters[key]=filter[key];

            const data = await fetchFilters(filters);
            bookFilterStore.updateAuthors(data.authors);
            bookFilterStore.updateGenres(data.genres);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        getFilterData()
    }, [bookSelectedFilterStorage]);
    useEffect(()=>{
        bookPaginationStore.setPage(Math.min(bookPaginationStore.page,bookPaginationStore.pageMax));
    }, [bookPaginationStore.pageMax]);

    const resetFilters=()=>{
        bookSelectedFilterStorage.removeAllFilters();
        bookPaginationStore.setPage(1);
    }

    return (
        <div className="filter-menu">
        <div className="filter-menu-sidebar">
            <DropDownFilterText field={"name"} />
            <DropDownSliderFilter field={"Year"} min={1900} max={2024} />
            <DropDownSliderFilter field={"Price"} min={0} max={100}/>
            <DropDownCheckbox field={"author"} data={authors} />
            <DropDownCheckbox field={"genre"} data={genres} />
            <Selector></Selector>
            <button className={"reset-filter-button"} onClick={resetFilters}>Reset Filters</button>
        </div>
        <div>FilterNumber: {bookSelectedFilterStorage.filterCount}</div>
        </div>
    );
};

export default FilterMenu;
