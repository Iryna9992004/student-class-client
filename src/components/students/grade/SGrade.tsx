import React from 'react';
import styles from './Grade.module.css';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { IGrade } from '../../../models/IGrade';

export default function Grade({ name, grade, url, student }: IGrade) {

  return (
    <div className={styles.homework__item}>
      <a href={url} >
        <IoCloudDownloadOutline style={{fontSize:'50'}} className={styles.icon__down} />
      </a>
      <div className={styles.homework__information}>
        <span className={styles.homework__course}>Name: {name}</span>
        <span className={styles.homework__course}>Student: {student}</span>
      </div>
      <div className={styles.homework__grade}>
        <span>Grade: {grade}</span>
      </div>
    </div>
  );
}


