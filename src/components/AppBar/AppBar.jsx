import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthNav from "../AuthNav/AuthNav";
import css from './AppBar.module.css'
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { Box } from "@mui/material";

const AppBar = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  return (
   <Box sx={{ flexGrow: 1 }}className={css.boxAppBar}>
      <div className={css.nav}>
        <Navigation />
        {isLogged ? <UserMenu /> : <AuthNav />}
      </div>
      </Box>
 
  );
};

export default AppBar;
