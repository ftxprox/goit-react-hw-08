import { Box } from '@mui/material';
import { LiaPhoneSquareSolid } from "react-icons/lia";
import css from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Box className={css.boxHomePage}>
        <LiaPhoneSquareSolid className={css.logoIcon} />
         <h1 className={css.title}>
          Phone<span>book</span>
        </h1> 

      </Box>
    </>
  );
}
