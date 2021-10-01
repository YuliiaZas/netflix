import { useRef } from 'react';

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

  return <form className="form" onSubmit={submitHandler}>
    <h1 className="form__title">Sign In</h1>
    <label 
        htmlFor="email" 
        className="form__label">
      Email
    </label>
    <input 
      type="text" 
      id="email" 
      placeholder="Email" 
      className="form__input" 
      required 
      ref={emailRef} />
    <label 
        htmlFor="password" 
        className="form__label">
      Password
    </label>
    <input 
      type="password" 
      id="password" 
      placeholder="Password" 
      className="form__input" 
      required 
      ref={passwordRef} />
    <button 
        type="submit" 
        className="button form__button">
      Sign In
    </button>
  </form>; 
}
