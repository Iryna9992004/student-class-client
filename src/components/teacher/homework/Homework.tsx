import React,{useState,useEffect} from 'react'
import HomeworkItem from './HomeworkItem'
import HomeworkForm from './HomeworkForm'
import styles from './Homework.module.css'
import $api from '../../../http'
import { IHom } from '../../../models/IHom'
import EmptyList from '../../empty-list/EmptyList'

export default function Homework() {
  const [homework, setHomework]=useState<IHom[]>([]);
  const [reload,setReload]=useState<Boolean>(false)

  const getHomework = async () => {
    try {
      const response = await $api.get('/list_homework', {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setHomework(response.data)
    } catch (e) {
      console.error('Помилка завантаження файлу:', e);
    }
  };

  const changeReload=()=>setReload(!reload);

  useEffect(()=>{
    getHomework();
  },[reload])

  return (
    <div className={styles.homework__container}>
        <HomeworkForm reload={changeReload} />
        <div className={styles.homework__list}>
        {homework.length===0?<EmptyList text='Homework list is empty!' />:null}
         {homework.map(item=> <HomeworkItem reload={changeReload} _id={item._id} name={item.name} link={item.url} course={item.course} description={item.description} />) }
        </div>
      </div>
  )
}
