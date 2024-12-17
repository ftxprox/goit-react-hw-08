import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useEffect } from 'react';
import { deleteContact, fetchContact } from '../../redux/contacts/operations';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);


  return (
    <ul className={css.listContact}>
      {filteredContacts.length === 0 ? (
  <p>oops...no contacts found</p>
) : (
  filteredContacts.map((contact) => (
    <Contact
      key={contact.id}
      contact={contact}
      onDeleteContact={() => dispatch(deleteContact(contact.id))}
    />
  ))
)}
    </ul>
  );
}

export default ContactList;
