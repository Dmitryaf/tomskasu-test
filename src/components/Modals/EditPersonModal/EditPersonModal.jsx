import React, { useState, useContext } from 'react';
import axios from 'axios';
import store from '../../../store';

const EditPersonModal = (props) => {
  const {
    id,
    name,
    lastName,
    editPersonModalOpen,
    setEditPersonModalOpen,
  } = props;

  const inputName = React.createRef();
  const inputLastName = React.createRef();

  const { saveEditedItem, notifySuccessEdited, notifyError } = useContext(
    store
  );

  const [itemValue, setItemValue] = useState({
    id,
    name,
    lastName,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (itemValue.name && itemValue.lastName) {
      axios
        .put(`http://localhost:3001/persons/${id}`, itemValue)
        .then((response) => {
          if (response.status === 200) {
            saveEditedItem(itemValue);

            notifySuccessEdited();

            setEditPersonModalOpen({
              ...editPersonModalOpen,
              isOpen: false,
            });
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
    setItemValue({
      ...itemValue,
      name: newName.trim(),
      lastName: newLastName.trim(),
    });
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <form className="modal__form" onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="inputName" className="modal__label">
            Имя
            <input
              type="text"
              id="inputName"
              ref={inputName}
              value={itemValue.name}
              onChange={() => changeValues()}
              className="modal__input"
              placeholder="Введите имя"
            />
          </label>

          <label htmlFor="inputLastName" className="modal__label">
            Фамилия
            <input
              type="text"
              id="inputLastName"
              ref={inputLastName}
              value={itemValue.lastName}
              onChange={() => changeValues()}
              className="modal__input"
              placeholder="Введите фамилию"
            />
          </label>
          <div className="modal__btns">
            <button
              type="button"
              className="btn"
              onClick={() =>
                setEditPersonModalOpen({
                  ...editPersonModalOpen,
                  isOpen: false,
                })
              }
            >
              Закрыть
            </button>

            <button className="btn" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonModal;
