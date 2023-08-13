import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const ContactForm = ({ onSubmit }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

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
        break;
    }
  };

  const onSubmitForm = event => {
    event.preventDefault();

    onSubmit({ name, number });
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
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
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
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
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

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
