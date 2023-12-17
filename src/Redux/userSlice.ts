import {createSlice} from '@reduxjs/toolkit';

type InitialStateType = {
    accessToken:string

}

const initialState:InitialStateType = {
    accessToken:''
}

const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        updateUserCredentials:(state,action)=>{
            state.accessToken = action.payload?.accessToken

        },
        logoutUser:(state,action)=>{
            state.accessToken=''
          
        }
    }

})


export const {updateUserCredentials,logoutUser} = userSlice.actions 
export default userSlice.reducer
