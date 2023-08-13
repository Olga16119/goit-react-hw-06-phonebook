import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onCheckContact = data => {
    const { name, number } = data;
    const isExistName = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (isExistName) {
      alert(`${name}is already in contacs`);
      return;
    }
    const newContact = {
      id: nanoid(),
      ...data,
    };
    setContacts(contacts => [...contacts, newContact]);
  };

  const onFilterChange = event => {
    setFilter(event.target.value);
  };

  const onDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const getFilterOfContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onCheckContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={onFilterChange} />
      <ContactList
        contacts={getFilterOfContacts()}
        onDelete={onDeleteContact}
      />
    </div>
  );
};

export default App;
