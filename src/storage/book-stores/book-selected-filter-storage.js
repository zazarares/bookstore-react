import {create} from 'zustand';
import {capitalizeFirstLetter} from "../../utils";

const initialFilterState = {
    name: "",
    author: [],
    minPrice: 0,
    maxPrice: 100,
    minYear: 1900,
    maxYear: 2024,
    genre: [],
    sortBy: "",
    sortOrder: ""
};

const BookSelectedFilterStorage = create((set) => ({
    filter: {...initialFilterState},
    filterCount: 0,

    updateFilterCount: (filter) => {
        const genreCount = filter.genre.length;
        const authorCount = filter.author.length;
        const priceFiltersOn = filter.minPrice !== initialFilterState.minPrice || filter.maxPrice !== initialFilterState.maxPrice;
        const yearFiltersOn = filter.minYear !== initialFilterState.minYear || filter.maxYear !== initialFilterState.maxYear;
        const nameFilter = filter.name !== "";
        return genreCount + authorCount + priceFiltersOn + yearFiltersOn + nameFilter;
    },

    removeAllFilters: () => set({
        filter: {...initialFilterState},
        filterCount: 0,
    }),

    update: (field, value) => set((state) => {
        const newFilter = {...state.filter, [field]: value};
        return {
            filter: newFilter,
            filterCount: state.updateFilterCount(newFilter)
        };
    }),

    updateRange: (field, min, max) => set((state) => {
        const newFilter = {
            ...state.filter,
            ['min' + capitalizeFirstLetter(field)]: min,
            ['max' + capitalizeFirstLetter(field)]: max
        };
        return {
            filter: newFilter,
            filterCount: state.updateFilterCount(newFilter)
        };
    }),

    getCheckedFields: (field) => {
        return BookSelectedFilterStorage.getState().filter[field];
    },

}));

export default BookSelectedFilterStorage;
