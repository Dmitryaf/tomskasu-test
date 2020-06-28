import React from 'react';
import {
  faPencilAlt,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Person.module.css';

const Person = (props) => {
  const {
    id,
    name,
    lastName,
    setEditPersonModalOpen,
    setDeletedPersonModalOpen,
  } = props;

  return (
    <tr className={styles.person}>
      <td className={styles.person__td}>
        <FontAwesomeIcon className={styles.person__icon} icon={faUserCircle} />
        <span className={styles.person__name}>{name}</span>
      </td>
      <td className={styles.person__td}>{lastName}</td>
      <td colSpan="2" className={styles.person__td}>
        <div className={styles.person__options}>
          <button
            type="button"
            className={`${styles.person__edit} ${styles.person__optionsIcon}`}
            onClick={() => {
              setEditPersonModalOpen({
                currentItem: id,
                isOpen: true,
              });
            }}
          >
            <FontAwesomeIcon className={styles.editIco} icon={faPencilAlt} />
          </button>
          <button
            type="button"
            className={`${styles.person__delete} ${styles.person__optionsIcon}`}
            onClick={() => {
              setDeletedPersonModalOpen({
                currentItem: id,
                isOpen: true,
              });
            }}
          >
            <FontAwesomeIcon className={styles.deleteIco} icon={faTimes} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Person;
