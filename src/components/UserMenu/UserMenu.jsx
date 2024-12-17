import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import css from './UserMenu.module.css';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import { Box } from '@mui/material';

const UserMenu = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const handleLogout = () => {
    toast.promise(dispatch(logout(token)).unwrap(), {
      loading: 'Logout...',
      success: <b>The user is logged out!</b>,
      error: <b>Missing logout!</b>,
    });
  };

  return (
    <Box className={css.boxUserMenu}>
      <p className={css.link}>
        Hello, <span>{user.name}</span>!
      </p>
      <button type="button" onClick={handleLogout} className={css.btnLogout}>
        Logout
      </button>
    </Box>
  );
};
export default UserMenu;
