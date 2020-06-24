import React, { useContext } from 'react';
import store from '../../../store';

const DeletedPersonModal = (props) => {
  const { deletePerson } = useContext(store);
  return (
    <div className="modal">
      <div className="modal__body">
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

        <button
          className="btn btn_end btn_red"
          onClick={() => deletePerson(props.id)}
          type="button"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default DeletedPersonModal;
