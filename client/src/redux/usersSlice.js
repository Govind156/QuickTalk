import {createSlice} from '@reduxjs/toolkit'
const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        Alluser:[],
        Allchats:[],
    },
    reducers:{
        setUser:(state,action)=>{state.user=action.payload;},
        setAllUser:(state,action)=>{state.Alluser=action.payload;},
        setAllChats:(state,action)=>{state.Allchats=action.payload},
    }
})
export const {setUser,setAllUser,setAllChats}=userSlice.actions
export default userSlice.reducer;

