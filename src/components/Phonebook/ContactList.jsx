import React from 'react';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div>
      <p>Contacts</p>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button onClick={() => deleteContact(contact.id)} type="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
