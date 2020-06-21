import React from 'react';
import {
  faPencilAlt,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Person.module.css';

const Person = (props) => {
  return (
    <tr className={styles.person}>
      <td className={styles.person__td}>
        <FontAwesomeIcon className={styles.person__icon} icon={faUserCircle} />
        <span className={styles.person__name}>{props.name}</span>
      </td>
      <td className={styles.person__td}>{props.lastName}</td>
      <td colSpan="2" className={styles.person__td}>
        <div className={styles.person__options}>
          <div
            className={`${styles.person__edit} ${styles.person__optionsIcon}`}
          >
            <FontAwesomeIcon className={styles.editIco} icon={faPencilAlt} />
          </div>
          <div
            className={`${styles.person__delete} ${styles.person__optionsIcon}`}
          >
            <FontAwesomeIcon className={styles.deleteIco} icon={faTimes} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Person;
