import React,{useState,useContext} from 'react';
import styles from './Course.module.css';
import { Context } from '../../..';

interface CourseProps{
  deleteCourse: (keyword: number) => void,
  del:(keyword:boolean)=>void
}

export default function CourseDelete({deleteCourse,del}:CourseProps) {
   const [keyWord,setKeyWord]=useState<string>('');
   const {store}=useContext(Context);

  return (
    <div className={styles.homework__item}>
      <div className={styles.add__options1}>
           <input type="input"
            value={keyWord} 
            onChange={(e)=>setKeyWord(e.target.value)}
            className={styles.homework__put1} 
            placeholder="Write a CURRENT name of course:" />
  
          <button className={styles.shedule__button} 
              onClick={()=>{
              store.deleteCourse(keyWord);
              setKeyWord('');
              del(false);
              deleteCourse(Date.now()); }}>
          Delete</button>
      </div>
    </div>
  )
}
