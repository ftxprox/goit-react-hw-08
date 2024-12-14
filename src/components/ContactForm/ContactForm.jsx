import css from './ContactForm.module.css';
import { useId } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';


const ContactForm = () => {
  const idName = useId();
  const idNumber = useId();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .matches(
        /^(\d{2,4}-?)+\d{2,4}$/,
        'Number must be between 6 and 15 digits and can include hyphens, e.g., 123-456-7890',
      )
      .required('Number is required'),
  });

  const initialValues = {
    name: '',
    number: '',
  };

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const handleSubmit = (values, actions) => {
    const { name, number } = values;

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`Contact with name "${name}" already exists!`); 
      return;
    }
    const data = { ...values, id: nanoid(6) };
    actions.resetForm();
    dispatch(addContact(data));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className={css.formContact}>
          <label htmlFor={idName} className={css.labelContact}>
            Name
          </label>
          <Field
            id={idName}
            className={css.field}
            type="text"
            name="name"
            required
            autoFocus
          />
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage}
          />

          <label htmlFor={idNumber} className={css.labelContact}>
            Number
          </label>
          <Field
            id={idNumber}
            className={css.field}
            type="tel"
            name="number"
            required
          />
          <ErrorMessage
            name="number"
            component="div"
            className={css.errorMessage}
          />

          <button
            className={css.buttonAdd}
            type="submit"
            disabled={!isValid || !dirty}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm
