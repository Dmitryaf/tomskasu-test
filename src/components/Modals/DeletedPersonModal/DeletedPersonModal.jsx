import React, { useContext } from 'react';
import axios from 'axios';
import store from '../../../store';

const DeletedPersonModal = (props) => {
  const {
    id,
    name,
    lastName,
    deletedPersonModalOpen,
    setDeletedPersonModalOpen,
  } = props;

  const { deletePerson, notifySuccessDelete, notifyError } = useContext(store);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then((response) => {
        if (response.status === 200) {
          deletePerson(id);

          notifySuccessDelete();

          setDeletedPersonModalOpen({
            ...deletedPersonModalOpen,
            isOpen: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        notifyError();
      });
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <form
          className="modal__form"
          onSubmit={(e) => submitHandler(e)}
          method="delete"
        >
          <div className="modal__notification">
            <p>
              Удалить сотрудника:
              <span>{name}</span>
              <span>{lastName} ?</span>
            </p>
          </div>
          <div className="modal__btns">
            <button
              className="btn"
              onClick={() =>
                setDeletedPersonModalOpen({
                  ...deletedPersonModalOpen,
                  isOpen: false,
                })
              }
              type="button"
            >
              Закрыть
            </button>

            <button className="btn btn_red" type="submit">
              Удалить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeletedPersonModal;
