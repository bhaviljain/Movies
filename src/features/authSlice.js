import { createSlice } from '@reduxjs/toolkit';

// receive user from localStorage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: getUserFromLocalStorage(),
  },
  reducers: {
    login(state, action) {
      state.users = { email: action.payload };
      localStorage.setItem('user', JSON.stringify(state.users));
    },
    logout(state) {
      state.users = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
