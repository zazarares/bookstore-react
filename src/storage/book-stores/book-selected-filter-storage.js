import {create} from 'zustand';

const initialFilterState = {
    name: "",
    author: [],
    minPrice:0,
    maxPrice:1000,
    minYear:0,
    maxYear:3000,
    genre: [],
    sortBy: "",
    sortOrder: ""
};

const bookSelectedFilterStorage = create((set) => ({
    filter: { ...initialFilterState },
    filterCount: 0,
    reset: 0,

    updateFilterCount: (filter) => {
        const genreCount = filter.genre.length;
        const authorCount = filter.author.length;
        return genreCount + authorCount;
    },

    removeAllFilters: () => set({
        filter: { ...initialFilterState },
        filterCount: 0,
        reset: 1
    }),

    unSetReset: () => set({ reset: 0 }),

    update: (field, value) => set((state) => {
        const newFilter = { ...state.filter, [field]: value };
        return {
            filter: newFilter,
            filterCount: bookSelectedFilterStorage.getState().updateFilterCount(newFilter)
        };
    }),

    updateRange: (field, min, max) => set((state) => {
        const newFilter = { ...state.filter, ['min'+field]: min,['max'+field]: max };
        return {
            filter: newFilter,
            filterCount: bookSelectedFilterStorage.getState().updateFilterCount(newFilter)
        };
    }),

    getCheckedFields: (field) => {
        const state = bookSelectedFilterStorage.getState(); // Get the current state
        return state.filter[field];
    },

}));

export default bookSelectedFilterStorage;
