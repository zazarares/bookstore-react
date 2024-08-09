import { create } from 'zustand'

const bookStorage = create((set) => ({
    name: "",
    author: "",
    price: "0-10000",
    year: "0-10000",
    genre:"",
    url:"",
    update: (field,value) => set({ [field]: value }),
    updateRange: (field,min,max) => set({ [field]: `${min}-${max}` }),
    getBook:()=>
    {
        const state = bookStorage.getState(); // Get the current state
        return{
            name:state.name,
            author:state.author,
            year:state.year,
            price:state.price,
            genre:state.genre,
            url:state.url
        }
    },
    setBook:(book)=>
    {
      set({name: book.name, author: book.author, price: book.price, genre: book.genre,year:book.year,url:book.url});
    }


}))

export default bookStorage