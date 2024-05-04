import React,{useState,useEffect} from 'react'
import HomeworkItem from './SHomeworkItem'
import styles from './Homework.module.css'
import $api from '../../../http'
import { ITrain } from '../../../models/ITrain'
import EmptyList from '../../empty-list/EmptyList'

export default function Homework() {
  const [trainings,setTrainings]=useState<ITrain[]>([]);

  async function getTrainings(){
    try{
      const response=await $api.get<ITrain[]>('/list_homework');
      setTrainings(response.data);
    }
    catch(e){
      console.log(e);
    }
  }
  
  useEffect(()=>{
    getTrainings();
  },[])

  return (
    <div className={styles.homework__container}>
        <div className={styles.homework__list}>
          {trainings.length===0?<EmptyList text='Homework list is empty!'/>:null}
         {trainings.map(item=> <HomeworkItem _id={item._id} name={item.name} link={item.url} course={item.course} description={item.description} />) }
        </div>
      </div>
  )
}
