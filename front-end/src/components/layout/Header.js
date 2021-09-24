import { NavLink } from 'react-router-dom';

import classes from './Header.module.css';

function Header () {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact
                className={classes.link}
                activeClassName={classes['link--active']}>
              Netflix
            </NavLink>
          </li>
          <li>
            <NavLink to="/shows"
                className={classes.link}
                activeClassName={classes['link--active']}>
              Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites"
                className={classes.link}
                activeClassName={classes['link--active']}>
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/friends"
                className={classes.link}
                activeClassName={classes['link--active']}>
              Friends
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
