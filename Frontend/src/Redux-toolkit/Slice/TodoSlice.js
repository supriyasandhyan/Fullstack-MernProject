import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

//api call in Async thunk

export const fetchTodo = createAsyncThunk("todos/fetchTodo", async()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    console.log('data: ', response);
    return response.json()
})

const todoSlice = createSlice({
    name:"todo",
    initialState:{
        isLoading:false,
        data:[],
        error: null
    },

    reducers:{},
    extraReducers:(builder)=>{
         builder
         .addCase(fetchTodo.pending,(state)=>{
            state.isLoading=true
         })
         .addCase(fetchTodo.fulfilled ,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
         })
         .addCase(fetchTodo.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.error.message
         })
    }
},
)

export default todoSlice.reducer