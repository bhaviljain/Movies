import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(email));
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
