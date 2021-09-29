import LoginForm from "../components/LoginForm";
import classes from './Login.module.css';

function Login() {
  function loginHandler (loginData) {
    console.log(loginData)
  }

  return <section className={classes.login}>
    <LoginForm onLogin ={loginHandler} />
  </section>;
}

export default Login;
