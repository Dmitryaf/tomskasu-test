import React, { useState, useContext } from 'react';
import store from '../../../store';

const EditPersonModal = (props) => {
  let inputName = React.createRef();
  let inputLastName = React.createRef();

  let { saveEditedItem } = useContext(store);
  let [itemValue, setItemValue] = useState({
    id: props.id,
    name: props.name,
    lastName: props.lastName,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (itemValue.name && itemValue.lastName) {
      saveEditedItem(itemValue);
    }
  };

  const changeValues = () => {
    let newName = inputName.current.value;
    let newLastName = inputLastName.current.value;
    setItemValue({
      id: props.id,
      name: newName.trim(),
      lastName: newLastName.trim(),
    });
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <button
          className="modal__close"
          onClick={() =>
            props.setEditPersonModalOpen({
              isOpen: false,
            })
          }
        >
          Назад к списку
        </button>
        <form className="modal__form" onSubmit={(e) => submitHandler(e)}>
          <label className="modal__label">
            {'Имя'}
            <input
              type="text"
              ref={inputName}
              value={itemValue.name}
              onChange={() => changeValues()}
              className="modal__input"
            />
          </label>

          <label className="modal__label">
            {'Фамилия'}
            <input
              type="text"
              ref={inputLastName}
              value={itemValue.lastName}
              onChange={() => changeValues()}
              className="modal__input"
            />
          </label>

          <button className="btn modal__btn-add" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPersonModal;
