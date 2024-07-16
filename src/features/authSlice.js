import { createSlice } from '@reduxjs/toolkit';

// Retrieve user from localStorage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromLocalStorage(),
  },
  reducers: {
    login(state, action) {
      state.user = { email: action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
