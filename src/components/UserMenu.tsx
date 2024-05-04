import React,{useContext} from 'react'
import styles from './UserMenu.module.css'
import { Context } from '..';
interface Props {
  changeParentState: (newValue: boolean) => void;
}
export default function UserMenu({changeParentState}:Props) {
  const {store}=useContext(Context);
  const handleClick = () => {
    changeParentState(false);
  };
  return (
    <div className={styles.container}>
        <button className={styles.shedule__button} onClick={()=>store.deleteShedules()}>Delete all the shedules</button>
        <button className={styles.shedule__button} onClick={()=>store.deleteHomeworks()}>Delete all the homeworks</button>
        <button className={styles.shedule__button} onClick={()=>store.deleteStudents()}>Delete all the students</button>
        <button className={styles.shedule__button} onClick={()=>store.deleteCourses()}>Delete all the courses</button>
        <button className={styles.shedule__button} onClick={()=>store.deleteTrainings()}>Delete all the trainings</button>
        <button className={styles.shedule__button} onClick={()=>store.deleteAccont()}>Delete my accont and all the infirmation</button>
        <button className={styles.close__button} onClick={handleClick}>Close</button>
    </div>
  )
}
