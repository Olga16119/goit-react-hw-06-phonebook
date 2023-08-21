import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addcontact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onChangeForm = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'number':
        setNumber(value);
        break;

      case 'name':
        setName(value);
        break;

      default:
        throw new Error('Error');
    }
  };

  const onSubmitForm = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLocaleLowerCase()
      ) ||
      contacts.find(contact => contact.number === newContact.number)
    ) {
      return alert(` ${newContact.name} already is in phonebook`);
    }
    dispatch(addcontact(newContact));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        placeholder="Enter your name"
        value={name}
        onChange={onChangeForm}
        id={nanoid()}
        required
      ></input>
      <input
        type="tel"
        name="number"
        placeholder="Enter your number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={onChangeForm}
        id={nanoid()}
      />
      <button>Add Contact</button>
    </form>
  );
};

export default ContactForm;
