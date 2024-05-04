import React from 'react';
import styles from './Homework.module.css';
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from 'axios';

interface HI {
  _id:string;
  name: string;
  course:string;
  description:string;
  link: string;
  reload:()=>void
}

export default function HomeworkItem({ reload, _id, name, link,course,description}: HI) {

  async function deleteHomework(){
    try{
      const response=await axios.post('https://hidden-peak-94221-eb2bc6193187.herokuapp.com/api/delete_homework',{_id});
      console.log(response);
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
        <span className={styles.homework__description}> Name: {name}</span>
        <span className={styles.homework__description}> Description: {description}</span>
      </div>
      <a onClick={()=>{deleteHomework(); reload()}} ><MdDeleteOutline className={styles.icon__down} /></a>
     
    </div>
  );
}
