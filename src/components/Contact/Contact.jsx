import css from './Contact.module.css';
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { deleteContact } from '../../redux/contactsOps';
import { useDispatch } from "react-redux";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <li className={css.itemContact}>
      <IoMdPerson size={18} className={css.iconPeople} />
      {contact.name}:{' '}
      <BsFillTelephoneFill size={18} className={css.iconPhone}
      />
      {contact.number}
      <button className={css.buttonDelete} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}


export default Contact;