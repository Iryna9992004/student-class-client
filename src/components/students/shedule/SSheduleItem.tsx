import styles from './Shedule.module.css';
import { FaStar } from 'react-icons/fa';

interface SheduleItemProps {
  _id: string;
  date: Date;
  course: string;
  name: string;
  description: string;
}

export default function SheduleItem({_id,date,course,name,description,}: SheduleItemProps) {

  return (
    <div className={styles.shedule__item} id={_id}>
      <div className={styles.shedule__block}>
        <FaStar className={styles.star} />
        <span className={styles.shedule_subject}>Subject: {course} </span>
      </div>
      <div className={styles.shedule__description}>
        Name: {name}
      </div>
      <div className={styles.shedule__description}>
        Date: {new Date(date).toDateString()}
      </div>
      <div className={styles.shedule__description}>
        Description: {description}
      </div>
    </div>
  );
}
