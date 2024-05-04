import React,{useState} from 'react'
import styles from './Grade.module.css'
import { IoCloudDownloadOutline } from "react-icons/io5";
import GradeHomeworkList from './GradeHomeworkList';

interface IHomework{
  _id:string;
  name:string;
  course:string;
  description:string;
  type:string;
  url:string;
}

export default function Grade({_id,name,course,description,type,url}:IHomework) {
  const [list,setList]=useState<boolean>(false); 

  const updateParent=(data:boolean)=>{
    setList(data);
  }

  return (
    <div>
    <div className={styles.homework__item}>
       <a href={url}><IoCloudDownloadOutline className={styles.icon__down} /></a>
          <div className={styles.homework__information}>
              <span className={styles.homework__course}>Course: {course}</span>
              <span className={styles.homework__description}> Name: {name}</span>
              <span className={styles.homework__description}> Description: {description}</span>
    </div>
    <div className={styles.homework__grade}>
    <span>10/10</span>
    <button className={styles.homework__button} onClick={()=>setList(true)}>Add</button>
  </div>
  </div>
  {list?<GradeHomeworkList _id={_id} name={type} updateParent={updateParent}/>:''}
  </div>
  )
}
