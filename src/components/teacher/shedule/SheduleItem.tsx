import React, { useContext, useState } from 'react';
import styles from './Shedule.module.css';
import { FaStar } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import { Context } from '../../..';
import SheduleEdit from './SheduleEdit';

interface SheduleItemProps {
  _id: string;
  date: Date;
  course: string;
  name: string;
  description: string;
  del:()=>void
}

export default function SheduleItem({ del, _id, date, course, name, description }: SheduleItemProps) {
  const { store } = useContext(Context);
  const [edit, setEdit] = useState<boolean>(false);

  const editItem=()=>setEdit(false);

  return (
    <div className={styles.shedule__item} id={_id}>
      <div className={styles.shedule__block}>
        <FaStar className={styles.star} />
        <span className={styles.shedule_subject}>Subject: {course} </span>
      </div>
      <div className={styles.shedule__description}>
        <div>
          Name: {name}
        </div>
        <div>
          Description: {description}
        </div>
        <div>
        Date: {new Date(date).toLocaleDateString()}
        </div>
      </div>
      <div>
        <MdDeleteOutline className={styles.icon__down} onClick={() => {store.deleteShed(_id)}} />
        <RiEdit2Fill onClick={() => {setEdit(!edit);del()}} className={styles.icon__down} />
      </div>
      {edit ? <SheduleEdit edit={editItem} del={del} _id={_id} /> : null}
    </div>
  );
}
