import { create } from 'zustand'

const bookSelectedFilterStorage = create((set) => ({
    filterCount: 0,
    name: "",
    author: "",
    price: "0-10000",
    year: "0-10000",
    genre:"",
    sortBy:"",
    sortOrder:"",
    increaseFilterCount: () => set((state) => ({ filterCount: state.filterCount + 1 })),
    decreaseFilterCount: () => set((state) => ({ filterCount: state.filterCount - 1 })),
    removeAllFilters: () => set({ filterCount: 0 ,name: "",
        author: "",
        price: "0-10000",
        year: "0-10000",
        genre:"" }),
    update: (field,value) => {set({ [field]: value })},
    getCheckedFields: (field) => {
        const state = bookSelectedFilterStorage.getState(); // Get the current state
        if(field==="genre") return state.genre
    else return state.author
    },
    updateRange: (field,min,max) => set({ [field]: `${min}-${max}` }),
    getFilter:()=>
    {
        const state = bookSelectedFilterStorage.getState(); // Get the current state
        return{
            name:state.name,
            author:state.author,
            year:state.year,
            price:state.price,
            genre:state.genre
        }
    }

}))

export default bookSelectedFilterStorage