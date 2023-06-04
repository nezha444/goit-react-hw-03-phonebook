import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div>
        <p>Find contacts by name</p>
        <input
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            onChange={this.props.hendleChangeFilter}
            />
      </div>
    );
  }
}
