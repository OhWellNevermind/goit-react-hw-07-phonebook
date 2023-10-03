import { ContactsList } from './ContactsList/ContactsList';
import { NewContactForm } from './NewContactForm/NewContactForm';
import { SearchBar } from './SearchBar/SearchBar';
import { Container } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const visibleContacts = useMemo(() => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter?.toLowerCase());
    });
  }, [contacts, filter]);

  return (
    <Container>
      <h1>PhoneBook</h1>
      <NewContactForm />
      {!visibleContacts.length ? (
        <p>There is no contacts</p>
      ) : (
        <>
          <h2>Contacts</h2>
          <SearchBar />
          <ContactsList />
        </>
      )}
    </Container>
  );
};
