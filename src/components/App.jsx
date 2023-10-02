import { ContactsList } from './ContactsList/ContactsList';
import { NewContactForm } from './NewContactForm/NewContactForm';
import { SearchBar } from './SearchBar/SearchBar';
import { Container } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from 'redux/contactsSilce';
import { change } from 'redux/filterSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const addNewContact = newContact => {
    const isInContacts = contacts.filter(contact => {
      return newContact.number === contact.number;
    }).length;

    if (isInContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    dispatch(addContact({ ...newContact }));
  };

  const onSearch = value => {
    dispatch(change(value));
  };

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const visibleContacts = useMemo(() => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter?.toLowerCase());
    });
  }, [contacts, filter]);

  return (
    <Container>
      <h1>PhoneBook</h1>
      <NewContactForm addNew={addNewContact}></NewContactForm>
      <h2>Contacts</h2>
      <SearchBar onSearch={onSearch}></SearchBar>
      <ContactsList
        onDelete={onDeleteContact}
        contacts={visibleContacts}
      ></ContactsList>
      {!visibleContacts.length && <p>There is no contacts</p>}
    </Container>
  );
};
