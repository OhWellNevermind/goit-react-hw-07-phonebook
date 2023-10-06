import {
  fetchContacts,
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/contactsSilce';
import { ContactsList } from './ContactsList/ContactsList';
import { NewContactForm } from './NewContactForm/NewContactForm';
import { SearchBar } from './SearchBar/SearchBar';
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>PhoneBook</h1>
      {isLoading && !error ? (
        <p>Loading...</p>
      ) : (
        <>
          <NewContactForm />
          <SearchBar />
          {!visibleContacts.length ? (
            <p>There is no contacts</p>
          ) : (
            <>
              <h2>Contacts</h2>
              <ContactsList />
            </>
          )}
        </>
      )}
    </Container>
  );
};
