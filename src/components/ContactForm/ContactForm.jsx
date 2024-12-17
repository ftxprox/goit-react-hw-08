import css from './ContactForm.module.css';
import { useId } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';

const ContactForm = () => {
  const idName = useId();
  const idNumber = useId();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .matches(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format.')
      .required('Number is required'),
  });

  const initialValues = {
    name: '',
    number: '',
  };

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(state => state.contacts.isLoading);

  const handleSubmit = async (values, actions) => {
    const { name, number } = values;

    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number,
    );

    if (isDuplicate) {
      alert(
        `Contact with name "${name}" or number "${number}" already exists!`,
      );
      return;
    }

    try {
      await dispatch(addContact({ name, number }));
      actions.resetForm();
    } catch (error) {
      alert('Failed to add contact. Please try again!');
    }
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
            disabled={!isValid || !dirty || isLoading}
          >
            {isLoading ? 'Adding...' : 'Add contact'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
