import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import store from '../../../store';

const AddPersonModal = () => {
  const inputName = useRef();
  const inputLastName = useRef();

  const {
    setIsAddPersonModalOpen,
    addPerson,
    persons,
    notifySuccessAdd,
    notifyError,
  } = useContext(store);

  const [inputsValue, setInputsValue] = useState({
    id: persons.length !== 0 ? persons[persons.length - 1].id + 1 : 1,
    name: '',
    lastName: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputsValue.name.trim() && inputsValue.lastName.trim()) {
      axios
        .post('http://localhost:3001/persons', inputsValue)
        .then((response) => {
          if (response.status === 201) {
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

            setIsAddPersonModalOpen(false);

            notifySuccessAdd();
          }
        })
        .catch((error) => {
          console.log(error);

          notifyError();
        });
    }
  };

  const changeValues = () => {
    const newName = inputName.current.value;
    const newLastName = inputLastName.current.value;
    setInputsValue({
      ...inputsValue,
      name: newName,
      lastName: newLastName,
    });
  };

  return (
    <div className="modal">
      <div className="modal__body">
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

          <div className="modal__btns">
            <button
              className="btn"
              onClick={() => setIsAddPersonModalOpen(false)}
              type="button"
            >
              Закрыть
            </button>

            <button className="btn" type="submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
