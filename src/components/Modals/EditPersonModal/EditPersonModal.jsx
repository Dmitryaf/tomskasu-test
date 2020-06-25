import React, { useState, useContext } from 'react';
import axios from 'axios';
import store from '../../../store';

const EditPersonModal = (props) => {
  const inputName = React.createRef();
  const inputLastName = React.createRef();

  const { saveEditedItem, notifySuccessEdited, notifyError } = useContext(
    store
  );
  const [itemValue, setItemValue] = useState({
    id: props.id,
    name: props.name,
    lastName: props.lastName,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (itemValue.name && itemValue.lastName) {
      axios
        .put(`http://localhost:3001/persons/${props.id}`, itemValue)
        .then((response) => {
          if (response.status === 200) {
            saveEditedItem(itemValue);

            notifySuccessEdited();
          }
        })
        .catch((error) => {
          console.log(error);
          notifyError();
        });
    }
  };

  const changeValues = () => {
    let newName = inputName.current.value;
    let newLastName = inputLastName.current.value;
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
          <label className="modal__label">
            Имя
            <input
              type="text"
              ref={inputName}
              value={itemValue.name}
              onChange={() => changeValues()}
              className="modal__input"
              placeholder="Введите имя"
            />
          </label>

          <label className="modal__label">
            Фамилия
            <input
              type="text"
              ref={inputLastName}
              value={itemValue.lastName}
              onChange={() => changeValues()}
              className="modal__input"
              placeholder="Введите фамилию"
            />
          </label>
          <div className="modal__btns">
            <button
              className="btn"
              onClick={() =>
                props.setEditPersonModalOpen({
                  ...props.editPersonalModalOpen,
                  isOpen: false,
                })
              }
              type="button"
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
