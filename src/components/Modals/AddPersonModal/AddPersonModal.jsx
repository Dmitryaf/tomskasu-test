import React, { useState, useContext } from 'react';
import store from '../../../store';

const AddPersonModal = () => {
  let inputName = React.createRef();
  let inputLastName = React.createRef();

  let { setIsAddPersonModalOpen, persons, addPerson } = useContext(store);
  let [inputsValue, setInputsValue] = useState({
    id: null,
    name: '',
    lastName: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputsValue.name.trim() && inputsValue.lastName.trim()) {
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
    let newName = inputName.current.value;
    let newLastName = inputLastName.current.value;
    setInputsValue({
      id: persons.length + 1,
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
        >
          Назад к списку
        </button>
        <form className="modal__form" onSubmit={submitHandler}>
          <input
            type="text"
            ref={inputName}
            value={inputsValue.name}
            onChange={() => changeValues()}
            className="modal__input"
          />
          <input
            type="text"
            ref={inputLastName}
            value={inputsValue.lastName}
            onChange={() => changeValues()}
            className="modal__input"
          />
          <button className="btn modal__btn-add" type="submit">
            Добавить сотрудника
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
