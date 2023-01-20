import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    useName: null,
    userID: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) =>{
        console.log(action.payload);
    }
  }
});

export const {SET_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.Email;
export const selectUserName = (state) => state.auth.UserName;
export const selectUserID = (state) => state.auth.UserID;

export default authSlice.reducer