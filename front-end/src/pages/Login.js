import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from "../components/LoginForm";
import classes from './Login.module.css';
import { showsActions } from '../store/showsSlice';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(showsActions.logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  }, [dispatch]);

  const loginUser = (tokenData) => {
    const {token} = tokenData;
    try {
      const {_id: userId, email} = jwt.decode(token);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', email);
  
      dispatch(showsActions.login());
    } catch (error) {
      console.log(error);
      alert('Email or Password is Wrong')
    }
  }

  const loginHandler = async (loginData) => {
    try {
      fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
        .then(res => loginUser(res))
        .then(() => history.replace('/shows'))
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return <section className={classes.login}>
    <LoginForm onLogin ={loginHandler} />
  </section>;
}

export default Login;
