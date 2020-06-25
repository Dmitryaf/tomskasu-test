import React, { useContext } from 'react';
import axios from 'axios';
import store from '../../../store';

const DeletedPersonModal = (props) => {
  const { deletePerson, notifySuccessDelete, notifyError } = useContext(store);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:3001/persons/${props.id}`)
      .then((response) => {
        if (response.status === 200) {
          deletePerson(props.id);

          notifySuccessDelete();
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
          <button
            className="modal__close"
            onClick={() =>
              props.setDeletedPersonModalOpen({
                ...props.deletedPersonModalOpen,
                isOpen: false,
              })
            }
            type="button"
          >
            Назад к списку
          </button>
          <div className="modal__notification">
            <p>
              Удалить сотрудника:
              <span> {props.name} </span>
              <span> {props.lastName} </span>?
            </p>
          </div>

          <button className="btn btn_end btn_red" type="submit">
            Удалить
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeletedPersonModal;
