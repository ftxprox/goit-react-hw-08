import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList'
import SearchBox from './components/SearchBox/SearchBox';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContact } from './redux/contactsOps';
import Loader from './components/Loader/Loader'
import { selectError, selectLoading } from './redux/contactsSlice';



 const App = () => {
 const dispatch = useDispatch();
  const loader = useSelector(selectLoading);
  const error = useSelector(selectError);


  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>
          Phone<span>book</span>
        </h1>
        <ContactForm />
        <SearchBox />
       {loader && !error ? <Loader /> : null}
        <ContactList />
      </div>
    </>
  );
}

export default App
