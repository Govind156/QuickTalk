import {createSlice} from '@reduxjs/toolkit'
const userSlice=createSlice({
    name:'user',
    initialState:{user:null,Alluser:[]},
    reducers:{
        setUser:(state,action)=>{state.user=action.payload;},
        setAllUser:(state,action)=>{state.Alluser=action.payload;}
    }
})
export const {setUser,setAllUser}=userSlice.actions
export default userSlice.reducer;

