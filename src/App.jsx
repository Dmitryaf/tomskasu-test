import React, { useEffect } from 'react';
import Person from './components/Person/Person';
import store from './store';
import AddPersonModal from './components/Modals/AddPersonModal/AddPersonModal';

function App() {
  let [persons, setPersons] = React.useState([]);
  let [isAddPersonModalOpen, setIsAddPersonModalOpen] = React.useState(false);

  const addPerson = (id, name, lastName) => {
    setPersons(
      persons.concat({
        id: id,
        name,
        lastName,
      })
    );
  };

  const deletePerson = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  const saveModalDetail = (id, name, lastName) => {
    setPersons(
      persons.map((person) => {
        if (person.id === id) {
          person.name = name;
          person.lastName = lastName;
        }
      })
    );
  };

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/persons';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((persons) => {
        setPersons(persons);
      });
  }, []);

  return (
    <store.Provider
      value={{
        persons,
        saveModalDetail,
        deletePerson,
        addPerson,
        setIsAddPersonModalOpen,
      }}
    >
      <div className="App">
        <div className="container">
          {isAddPersonModalOpen && <AddPersonModal />}
          <table className="persons">
            <caption className="persons__title">Сотрудники</caption>
            <thead className="persons__thead">
              <tr className="persons__thead-tr">
                <td className="persons__thead-td">Имя</td>
                <td colSpan="3" className="persons__thead-td">
                  Фамилия
                </td>
              </tr>
            </thead>

            <tbody className="persons__list">
              {persons.map((person) => {
                return (
                  <Person
                    name={person.name}
                    lastName={person.lastName}
                    id={person.id}
                    key={person.id}
                  />
                );
              })}
            </tbody>
          </table>

          <button
            className="btn"
            onClick={() => {
              setIsAddPersonModalOpen(true);
            }}
          >
            Add person
          </button>
        </div>
      </div>
    </store.Provider>
  );
}

export default App;
