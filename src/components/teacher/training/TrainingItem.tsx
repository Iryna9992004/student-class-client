import React from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import styles from './Training.module.css'
import $api from '../../../http';

interface ITraining{
  _id:string;
  course:string;
  theme:string;
  description:string;
  link:string;
  rel:()=>void
}

export default function TrainingItem({_id,course,theme,description,link,rel}:ITraining) {
  
  async function deleteTraining(){
    const formData = new FormData();
    formData.append('_id',_id)
    try{
      const response=await $api.post('/delete_training', formData, {headers: { 'Content-Type': 'multipart/form-data' }}
    );
      rel();
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div className={styles.homework__item}>
          <a href={link}><AiOutlineCloudUpload className={styles.icon__down} /></a>
          <div className={styles.homework__information}>
            <span className={styles.homework__course}>Course: {course}</span>
            <span className={styles.homework__description}> Theme: {theme}</span>
            <span className={styles.homework__description}> Description: {description}</span>
          </div>
          <a onClick={deleteTraining}><MdDeleteOutline className={styles.icon__down} /></a>
    </div>
  )
}
