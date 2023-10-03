import propTypes from 'prop-types';
import { List, Button } from '@mui/material';
import { ContactListItem } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSilce';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <List>
        {contacts.map(contact => {
          return (
            <ContactListItem key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Number: {contact.number}</p>
              <Button
                variant="contained"
                value={contact.id}
                onClick={evt => {
                  onDeleteContact(evt.target.value);
                }}
              >
                Delete
              </Button>
            </ContactListItem>
          );
        })}
      </List>
    </div>
  );
};

ContactsList.propTypes = {
  onDelete: propTypes.func,
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
      number: propTypes.string,
    })
  ),
};
