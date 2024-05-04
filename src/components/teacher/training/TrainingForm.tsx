import React,{useState,useEffect} from 'react';
import {ICourse} from '../../../models/ICourse'
import $api from '../../../http';
import styles from './Training.module.css';
import UserService from '../../../services/UserService';

interface TR{
  rel:()=>void;
}

export default function TrainingForm({rel}:TR) {
  const [theme,setTheme]=useState<string>('');
  const [description,setDescription]=useState<string>('');
  const [course,setCourse]=useState<string>('');
  const [course1,setCourse1]=useState<ICourse[]>([]);
  const [file,setFile]=useState<File | null>(null);

  async function getCourses(){
    try{
      const response=await UserService.fetchCourses();
      setCourse1(response.data);
      console.log(response);
    }
    catch(e){
      console.log(e);
    }
  }

  async function addTraining(e:React.SyntheticEvent){
    e.preventDefault()
    try{
      const formData = new FormData();
      if(file instanceof File){
        formData.append('file', file);
        formData.append('name', theme);
        formData.append('description',description);
        formData.append('course',course);

        const response = await $api.post('/add_training', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
        rel()
      }
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getCourses();
  },[]);

  return (
    <form className={styles.shedule__form}>
        <select className={styles.shedule__text} value={course} onChange={(e)=>{setCourse(e.target.value)}}>
          <option>Choose a course</option>
          {course1.map(item=><option>{item.name}</option>)}
        </select>
        <input type="text" placeholder="Write a theme of the lesson : " value={theme} onChange={(e)=>{setTheme(e.target.value)}} className={styles.shedule__text} />
        <input type="text" placeholder="Write a description : "value={description} onChange={(e)=>{setDescription(e.target.value)}} className={styles.shedule__text} />
     
        <div className={styles.upload__file}>
         <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
         <button onClick={addTraining} className={styles.shedule__button}>Завантажити</button>
      </div>
     
      </form>
  )
}
