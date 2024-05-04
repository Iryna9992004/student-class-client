import React,{useState,useEffect} from 'react'
import Grade from './Grade'
import styles from './Grade.module.css'
import {IHom} from '../../../models/IHom'
import $api from '../../../http'
import EmptyList from '../../empty-list/EmptyList'

export default function GradeList() {
  const [homework, setHomework]=useState<IHom[]>([]);
  const [training,setTraining]=useState<IHom[]>([]);

  const getHomework = async () => {
    try {
      const response = await $api.get('/list_homework', {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setHomework(response.data);
    } catch (e) {
      console.error('Помилка завантаження файлу:', e);
    }
  };    

  const getTraining = async () => {
    try {
      const response = await $api.get('/student_training_list', {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTraining(response.data)
    } catch (e) {
      console.error('Помилка завантаження файлу:', e);
    }
  }; 
  useEffect(()=>{
    getHomework();
    getTraining()
  },[])

  return (
    <div className={styles.homework__list}>
     {homework.length === 0 && training.length === 0 ? <EmptyList text="Students have not yet submitted their homework!"/> : null}
      {homework.map((item)=><Grade _id={item._id} url={item.url} course={item.course} description={item.description} name={item.name} type='homework'/>)}
      {training.map((item)=><Grade _id={item._id} url={item.url} course={item.course} description={item.description} name={item.name} type='training'/>)}
    </div>
  )
}
