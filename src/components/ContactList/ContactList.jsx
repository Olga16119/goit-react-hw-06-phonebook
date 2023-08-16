import ContactItem from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const visibleContacts = () => {
    const filterNormalized = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );
  };

  return (
    <ul className={css.contactList}>
      {visibleContacts().map(contact => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
};

export default ContactList;
