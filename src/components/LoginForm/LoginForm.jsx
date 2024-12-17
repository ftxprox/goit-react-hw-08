import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import css from './LoginForm.module.css';
import toast from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxSizing: 'border-box',
  maxWidth: '440px',
  minWidth: '320px',
  width: '100%',
  height: '480px',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2,
  paddingTop: '60px',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(() => localStorage.getItem('email') || ''); 
  const [password, setPassword] = useState(''); 

  const initialValues = { email, password };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await toast.promise(dispatch(login(values)).unwrap(), {
        loading: 'Logging in...',
        success: <b>Logged in successfully!</b>,
        error: <b>Failed to log in!</b>,
      });
      localStorage.setItem('email', values.email); 
      resetForm();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    setEmail(localStorage.getItem('email') || '');
  }, []);

  return (
    <Box sx={style}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              Email
              <Field
                type="email"
                name="email"
                className={css.fieldLogin}
                value={values.email}
                onChange={e => {
                  handleChange(e);
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className={css.label}>
              Password
              <Field
                type="password"
                name="password"
                className={css.fieldLogin}
                value={values.password}
                onChange={e => {
                  handleChange(e);
                  setPassword(e.target.value); 
                }}
              />
            </label>
            <Button
              type="submit"
              variant="contained"
              color="black"
              sx={{
                color:'black',
                width: '180px',
                height: '60px',
                marginTop: '50px',
                fontSize: '22px',
                backgroundColor: '#FF9900',
              }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
