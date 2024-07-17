import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../ReduxSlice/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loginvalidation,setloginvalidation] = useState(false) 
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(email));
    if(email === ""){
  setloginvalidation(true)
    }
  };
 
  return (
    <div className='login-page'>
      <h2>Login</h2>
      <input className='login-input'
        type="email"
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email or Name"
        required
      />
      <button onClick={handleLogin}
      className='login-btn'
      >Login</button>
      <h2 className={`login-validation ${loginvalidation ? "show-login-msg" :"dont-show-login-msg"}`}
      >Please add user details</h2>
    </div>
  );
};

export default Login;
