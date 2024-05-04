import React,{useState,useEffect} from 'react'
import styles from './Training.module.css'
import TrainingForm from './TrainingForm'
import TrainingItem from './TrainingItem'
import $api from '../../../http'
import { ITrain } from '../../../models/ITrain'
import EmptyList from '../../empty-list/EmptyList'

export default function Training() {
  const [trainings,setTrainings]=useState<ITrain[]>([]);
  const [reload,setReload]=useState(false)

  async function getTrainings(){
    try{
      const response=await $api.get<ITrain[]>('/get_trainings');
      setTrainings(response.data);
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getTrainings();
  },[reload]);

  const rel=()=>setReload(!reload);

  return (
    <div className={styles.homework__container}>
      <TrainingForm rel={rel}/>
      <div className={styles.homework__list}>
        {trainings.length===0?<EmptyList text='Training list is empty!'/>:null}
        {trainings.map(item=><TrainingItem rel={rel} _id={item._id} course={item.course} theme={item.name} description={item.description} link={item.url}/>)}
        </div>
      </div>
  )
}
