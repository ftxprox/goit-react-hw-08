import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import { Button } from '@mui/material';

const buttonStyles = {
  color: '#FF9900', 
  fontSize: '22px', 
  '&:hover': {
    color: '#ff99007e', 
  },
  '&:focus': {
    color: '##ff99007e', 
  },
};
const AuthNav = () => {
  return (
    <div className={css.boxAuthNav}>
      <ul>
        <NavLink to="/login">
          <Button sx={buttonStyles} variant="text" color="white">
            Login
          </Button>
        </NavLink>
        <NavLink to="/register">
          <Button sx={buttonStyles} variant="text" color="white">
            Register
          </Button>
        </NavLink>
      </ul>
    </div>
  );
};

export default AuthNav;
