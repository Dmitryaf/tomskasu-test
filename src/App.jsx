import React, { useEffect } from 'react';
import Person from './components/Person/Person';

function App() {
  let [persons, setPersons] = React.useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/persons';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((persons) => {
        setPersons(persons);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <table className="persons">
          <caption className="persons__title">Сотрудники</caption>
          <thead className="persons__thead">
            <tr className="persons__thead-tr">
              <td className="persons__td">Имя</td>
              <td colSpan="3" className="persons__td">
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
                  key={person.id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
