import React from 'react';
import Person from './components/Person/Person';

function App() {
  return (
    <div className="App">
      <div className="container">
        <table className="persons">
          <tbody>
            <tr className="persons__titles">
              <td className="persons__title">Имя</td>
              <td className="persons__title">Фамилия</td>
            </tr>
          </tbody>

          <div className="persons__list">
            <Person />
          </div>
        </table>
      </div>
    </div>
  );
}

export default App;
