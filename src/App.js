import React, { Component } from 'react';

function getState() {
  if (localStorage.getItem('state') == null) {
    return {
      reminders: [],
      completed: [],
    };
  } else {
    return JSON.parse(localStorage.getItem('state'));
  }
}

function updateState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

class App extends Component {
  constructor() {
    super();
    this.state = getState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      updateState(this.state);
    }
  }

  addReminder() {
    this.setState(state => {
      return {
        reminders: state.reminders.concat([
          {
            // reminder object
            createdAt: Date.now(),
            name: '',
            dosage: '',
            pillCount: 1,
          },
        ])
      }
    });
  }

  deleteReminder(deletedReminder) {
    this.setState(state => {
      return {
        reminders: state.reminders.filter(reminder => {
          return reminder !== deletedReminder;
        })
      }
    })
  }

  editReminder(editedReminder, key, value) {
    this.setState(state => {
      return { 
        reminders: state.reminders.map(reminder => {
          if (reminder === editedReminder) {
            return {
              ...reminder,
              [key]: value,
            }
          } else {
            return reminder;
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.addReminder.bind(this)}>Add reminder</button>

        <ul>
          {this.state.reminders.map((reminder) => {
            return <li key={reminder.createdAt}>
              <input type='checkbox' />
              <input type='time' />
              <input type='text' placeholder='Drug name' value={reminder.name} onChange={e => {
                this.editReminder(reminder, 'name', e.target.value);
              }} />
              <input type='number' placeholder='Pill count' value={reminder.pillCount} onChange={e => {
                this.editReminder(reminder, 'pillCount', e.target.value);
              }} />
              <input type='text' placeholder='Dosage' value={reminder.dosage} onChange={e => {
                this.editReminder(reminder, 'dosage', e.target.value);
              }} />
              <button onClick={() => {
                this.deleteReminder(reminder);
              }}>Delete</button> 
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
