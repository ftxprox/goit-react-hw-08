import { Link, NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { PiPhoneList } from "react-icons/pi";

const Navigation = () => {
  const isLogged = useSelector(selectIsLoggedIn);

  const nav = ({ isActive }) => {
    return clsx(isActive && css.active);
  };

  return (
    <nav className={css.navNavig}>

      <Link to="/" className={css.logoLink}>
        <PiPhoneList className={css.logoIcon} />
      </Link>

      <NavLink className={nav} to="/">
        Home
      </NavLink>

      {isLogged && (
        <NavLink className={nav} to="contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
