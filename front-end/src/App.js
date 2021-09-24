import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Shows from './pages/Shows';
import Favorites from './pages/Favorites';
import Friends from './pages/Friends';
import Header from './components/layout/Header'

// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/'>
          <Header />
          <Route path='/shows'>
            <Shows />
          </Route>
          <Route path='/favorites'>
            <Favorites />
          </Route>
          <Route path='/friends'>
            <Friends />
          </Route>
        </Route>
      </Switch>
    </div>
  );
}
  
  export default App;
  
  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit <code>src/App.js</code> and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </header>
  // </div>