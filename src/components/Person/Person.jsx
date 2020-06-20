import React from 'react';
import {
  faPencilAlt,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Person.module.css';

const Person = () => {
  return (
    <div className={styles.person}>
      <div className={styles.person__info}>
        <div className={styles.person__text}>
          <FontAwesomeIcon icon={faUserCircle} />
          Ivan
        </div>
        <div className={styles.person__text}>Ivanov</div>
      </div>
      <div className={styles.person__options}>
        <div className={styles.person__edit}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
        <div className={styles.person__delete}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </div>
  );
};

export default Person;
