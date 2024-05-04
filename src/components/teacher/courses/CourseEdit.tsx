import React,{useState,useContext} from 'react'
import { Context } from '../../..';
import styles from './Course.module.css'

interface CourseProps{
  editCourse:(f:number)=>void,
  ed:(keyword:boolean)=>void
}

export default function CourseEdit({editCourse,ed}:CourseProps) {

  const [oldName,setOldName]=useState<string>('');
  const [newDescription, setDescription]=useState<string>('');
  const [newName,setName]=useState<string>('');
  const {store}=useContext(Context);

  return (
    <div className={styles.homework__item}>
      <div className={styles.add__options1}>
           <input type="input"
            value={oldName} 
            onChange={(e)=>setOldName(e.target.value)}
            className={styles.homework__put1} 
            placeholder="Write a CURRENT name of course:" />

            <input type="input"
            value={newName} 
            onChange={(e)=>setName(e.target.value)}
            className={styles.homework__put1} 
            placeholder="Write a NEW name of course:" />
  
            <input type="input"
            value={newDescription} 
            onChange={(e)=>setDescription(e.target.value)}
            className={styles.homework__put1} 
            placeholder="Write a NEW description of course:" />

          <button className={styles.shedule__button} 
              onClick={()=>{
              store.editCourse(oldName,newName,newDescription);
              setOldName('');
              setName('');
              setDescription('');
              ed(false);
              editCourse(Date.now())}}>
          Edit</button>
      </div>
    </div>
  )
}
