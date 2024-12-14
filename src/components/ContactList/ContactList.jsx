import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { deleteContact, fetchContact } from '../../redux/contactsOps';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { useEffect } from 'react';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);


  return (
    <ul className={css.listContact}>
      {filteredContacts.length === 0 ? (
  <p>No contacts found</p>
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
