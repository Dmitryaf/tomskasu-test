import React, { useState, useContext } from 'react';
import axios from 'axios';
import store from '../../../store';

const AddPersonModal = () => {
  const inputName = React.createRef();
  const inputLastName = React.createRef();

  const { setIsAddPersonModalOpen, addPerson, persons } = useContext(store);
  const [inputsValue, setInputsValue] = useState({
    id: null,
    name: '',
    lastName: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputsValue.name.trim() && inputsValue.lastName.trim()) {
      axios
        .post('http://localhost:3001/persons', inputsValue)
        .then((response) => {
          console.log(response);
        });

      addPerson(
        inputsValue.id,
        inputsValue.name.trim(),
        inputsValue.lastName.trim()
      );

      setInputsValue({
        id: null,
        name: '',
        lastName: '',
      });
    }
  };

  const changeValues = () => {
    const newName = inputName.current.value;
    const newLastName = inputLastName.current.value;
    setInputsValue({
      id: persons[persons.length - 1].id + 1,
      name: newName,
      lastName: newLastName,
    });
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <button
          className="modal__close"
          onClick={() => setIsAddPersonModalOpen(false)}
          type="button"
        >
          Назад к списку
        </button>
        <form
          className="modal__form"
          onSubmit={(e) => submitHandler(e)}
          method="post"
        >
          <label htmlFor="inputName" className="modal__label">
            Имя
            <input
              id="inputName"
              type="text"
              ref={inputName}
              value={inputsValue.name}
              onChange={() => changeValues()}
              className="modal__input"
              placeholder="Введите имя"
            />
          </label>

          <label htmlFor="inputLastName" className="modal__label">
            Фамилия
            <input
              id="inputLastName"
              type="text"
              ref={inputLastName}
              value={inputsValue.lastName}
              onChange={() => changeValues()}
              className="modal__input"
              placeholder="Введите фамилию"
            />
          </label>

          <button className="btn btn_end" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
