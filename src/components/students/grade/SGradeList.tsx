import React,{useState,useEffect} from 'react'
import SGrade from './SGrade'
import styles from './Grade.module.css'
import $api from '../../../http'
import {IGrade} from '../../../models/IGrade'
import EmptyList from '../../empty-list/EmptyList'

export default function GradeList() {
  const [trainings,setTrainings]=useState<IGrade[]>([]);
  const [homeworks,setHomeworks]=useState<IGrade[]>([]);
   async function getWorks(){
    try{
      const response=await $api.get<IGrade[]>('/student_trainings');
      setTrainings(response.data);
    }
    catch(e){
      console.log(e);
    }
   }

   async function homegetWorks(){
    try{
      const response=await $api.get<IGrade[]>('/student_works');
      setHomeworks(response.data);
    }
    catch(e){
      console.log(e);
    }
   }

   useEffect(()=>{
    getWorks();
    homegetWorks();
   },[])
  return (
    <div className={styles.homework__list}>
      {trainings.length===0 && homeworks.length===0?<EmptyList text='Grade list is empty!'/>:null}
      {trainings.map(item=><SGrade _id={item._id} name={item.name} grade={item.grade} url={item.url} student={item.student}/>)}
      {homeworks.map(item=><SGrade _id={item._id} name={item.name} grade={item.grade} url={item.url} student={item.student}/>)}

    </div>
  )
}
