import React, { Component } from 'react';
import ContactForm from './Phonebook/ContactForm';
import { ContactList } from './Phonebook/ContactList';
import Filter from './Phonebook/Filter';
import { nanoid } from 'nanoid';

const LOCAL_NAME = 'Contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(_, prevState) {
    const localDataContacts = localStorage.getItem(LOCAL_NAME);
    const parsedLocalDataContacts = JSON.parse(localDataContacts);
    console.log(parsedLocalDataContacts);

    if (
      parsedLocalDataContacts &&
      parsedLocalDataContacts.length !== this.state.contacts.length
    ) {
      this.setState({ contacts: parsedLocalDataContacts });
    }
  }

  // записать контакты в хранилище, записать контакты из хранилища в стэйт,
  componentDidUpdate(_, prevState) {
    // записали в хранилище state
    localStorage.setItem(
      LOCAL_NAME,
      JSON.stringify(Array.from(this.state.contacts))
    );
    // const localDataContacts = localStorage.getItem(LOCAL_NAME);
    // const parceLocalDataContats = JSON.parse(localDataContacts);
    // console.log(parceLocalDataContats);
    // this.setState({ contacts: parceLocalDataContats });
  }

  hendleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleSubmit = ({ name, number }) => {
    const newContact = {
      id: `id-${nanoid()}`,
      name,
      number,
    };

    const isExist = this.state.contacts.some(
      el => el.name.toLowerCase() === name.toLowerCase() || el.number === number
    );

    if (isExist) {
      alert('Contact already exists');
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.getFilterContacts();
    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <ContactForm
          handleSubmit={this.handleSubmit}
          // handleChange={this.handleChange}
        />
        <Filter hendleChangeFilter={this.hendleChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
