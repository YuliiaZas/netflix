import { useRef } from 'react';

import classes from './LoginForm.module.css';

export default function LoginForm (props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    props.onLogin(loginData);
  }

  return <form className={classes.form} onSubmit={submitHandler}>
    <h1 className={classes.form__title}>Sign In</h1>
    <label 
        htmlFor="email" 
        className={classes.form__label}>
      Email
    </label>
    <input 
      type="text" 
      id="email" 
      placeholder="Email" 
      className={classes.form__input} 
      required 
      ref={emailRef} />
    <label 
        htmlFor="password" 
        className={classes.form__label}>
      Password
    </label>
    <input 
      type="password" 
      id="password" 
      placeholder="Password" 
      className={classes.form__input} 
      required 
      ref={passwordRef} />
    <button 
        type="submit" 
        className={`button ${classes.form__button}`}>
      Sign In
    </button>
  </form>; 
}
