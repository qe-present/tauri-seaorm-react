import {createSlice} from '@reduxjs/toolkit'
const bookSlice=createSlice({
    name: 'book',
    initialState: {
        data: []
    },
    reducers: {
        setBooks(state, action) {
            state.data = action.payload
        },
        addBook(state, action) {
            state.data.push(action.payload)
        },
        deleteBook(state, action) {
            state.data = state.data.filter(book => book.id !== action.payload)
        },
        editBook(state, action) {
            state.data = state.data.map(book => {
                if (book.id === action.payload.id) {
                    return action.payload
                }
                return book
            })
        }
    }
})

export const bookActions=bookSlice.actions
export default bookSlice