import {createSlice} from '@reduxjs/toolkit';


const nameStr = localStorage.getItem('name');
let name = '';
if (nameStr) {
  try {
    name = JSON.parse (nameStr);
  } catch (error) {
    console.error ('Failed to parse JSON from localStorage', error);
  }
}

const initialState = {
  isLoggedIn: false,
  name: name || '',
  user: {
    name: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

