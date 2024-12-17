import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader/Loader';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import Layout from './components/Layout/Layout';
import { selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
// const Navigation = lazy(() => import('./components/Navigation/Navigation'));


const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

 useEffect(() => {
   dispatch(refreshUser());
 }, [dispatch]);
  
  
  if (isRefreshing) {
    return <Loader />;
  }

 return isRefreshing ? (
   <Loader />
 ) : (
   <Suspense fallback={<Loader />}>
     <Routes>
       <Route path="/" element={<Layout />}>
         <Route index element={<HomePage />} />
         <Route
           path="/contacts"
           element={
             <PrivateRoute>
               <ContactsPage />
             </PrivateRoute>
           }
         />
         <Route
           path="/login"
           element={
             <RestrictedRoute redirectTo="/contacts">
               <LoginPage />
             </RestrictedRoute>
           }
         />
         <Route
           path="/register"
           element={
             <RestrictedRoute redirectTo="/contacts">
               <RegisterPage />
             </RestrictedRoute>
           }
         />
       </Route>
     </Routes>
   </Suspense>
 );
};

export default App;
