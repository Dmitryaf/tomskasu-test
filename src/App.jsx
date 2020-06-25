import React, { useEffect } from 'react';
import axios from 'axios';
import Person from './components/Person/Person';
import store from './store';
import AddPersonModal from './components/Modals/AddPersonModal/AddPersonModal';
import EditPersonModal from './components/Modals/EditPersonModal/EditPersonModal';
import DeletedPersonModal from './components/Modals/DeletedPersonModal/DeletedPersonModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [persons, setPersons] = React.useState([]);

  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = React.useState(false);

  const [editPersonModalOpen, setEditPersonModalOpen] = React.useState({
    currentItem: null,
    isOpen: false,
  });

  const [deletedPersonModalOpen, setDeletedPersonModalOpen] = React.useState({
    currentItem: null,
    isOpen: false,
  });

  const addPerson = (id, name, lastName) => {
    setPersons(
      persons.concat({
        id,
        name,
        lastName,
      })
    );
  };

  const deletePerson = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
    setDeletedPersonModalOpen({
      ...deletedPersonModalOpen,
      isOpen: false,
    });
  };

  const saveEditedItem = (Editeditem) => {
    setPersons(
      persons.map((person) => {
        if (person.id === Editeditem.id) {
          return {
            ...person,
            name: Editeditem.name,
            lastName: Editeditem.lastName,
          };
        }
        return person;
      })
    );
  };

  const notifySuccessAdd = () =>
    toast.success('Сотрудник добавлен!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccessDelete = () =>
    toast.success('Сотрудник удалён!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.error('Произошла ошибка!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccessEdited = () =>
    toast.success('Изменения сохранены!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <store.Provider
      value={{
        persons,
        saveEditedItem,
        deletePerson,
        addPerson,
        setIsAddPersonModalOpen,
        notifySuccessAdd,
        notifySuccessDelete,
        notifyError,
        notifySuccessEdited,
      }}
    >
      <div className="App">
        <div className="container">
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
                    editPersonModalOpen={editPersonModalOpen}
                    deletedPersonModalOpen={deletedPersonModalOpen}
                    setEditPersonModalOpen={setEditPersonModalOpen}
                    setDeletedPersonModalOpen={setDeletedPersonModalOpen}
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
            type="button"
          >
            Добавить сотрудника
          </button>

          {isAddPersonModalOpen && <AddPersonModal />}

          {persons.map((person) => {
            if (
              editPersonModalOpen.isOpen &&
              editPersonModalOpen.currentItem === person.id
            ) {
              return (
                <EditPersonModal
                  name={person.name}
                  lastName={person.lastName}
                  id={person.id}
                  editPersonModalOpen={editPersonModalOpen}
                  setEditPersonModalOpen={setEditPersonModalOpen}
                  key={person.id}
                />
              );
            }
            return false;
          })}

          {persons.map((person) => {
            if (
              deletedPersonModalOpen.isOpen &&
              deletedPersonModalOpen.currentItem === person.id
            ) {
              return (
                <DeletedPersonModal
                  name={person.name}
                  lastName={person.lastName}
                  id={person.id}
                  deletedPersonModalOpen={deletedPersonModalOpen}
                  setDeletedPersonModalOpen={setDeletedPersonModalOpen}
                  key={person.id}
                />
              );
            }
            return false;
          })}
          <ToastContainer />
        </div>
      </div>
    </store.Provider>
  );
}

export default App;
