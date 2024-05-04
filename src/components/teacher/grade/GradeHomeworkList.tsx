import React,{useEffect, useState} from 'react'
import styles from './Grade.module.css'
import { AiOutlineClose } from "react-icons/ai";
import SentHomeworkItem from './SentHomeworkItem';
import $api from '../../../http';
import { IGrade } from '../../../models/IGrade';

interface FuncProps{
    updateParent:(data:boolean)=>void;
    _id:string;
    name:string;
}
export default function GradeHomeworkList({updateParent,_id,name}:FuncProps) {
  const [homeworks,setHomeworks]=useState<IGrade[]>([]);
  const [trainings,setTrainings]=useState<IGrade[]>([]);
  const [reload,setReload]=useState(false);

     async function getHomeworks(){
        try{
          const response=await $api.post('/get_homework_by_id',{_id});
          setHomeworks(response.data);
        }
        catch(e){
            console.log(e);
        }
     }

     async function getTrainings(){
      try{
        const response=await $api.post('/get_training_by_id',{_id});
        setTrainings(response.data);
      }
      catch(e){
          console.log(e);
      }
   }

    const handleUpdate=()=>{
        updateParent(false);
    }

    useEffect(()=>{
      if(name==='homework'){
        getHomeworks();
      }
      else{
        getTrainings();
      }
   
    },[reload]);

    const update=()=>setReload(!reload);

  return (
    <div className={styles.sent__list}>
        <div className={styles.sent__homeworks}>
            <span>Sent Homeworks</span>
            <AiOutlineClose className={styles.close__list} onClick={handleUpdate}/>
        </div>
        
       {homeworks.map(item=><SentHomeworkItem update={update} _id={item._id} url={item.url} name='homework' grade={item.grade} student={item.student}/>)}
       {trainings.map(item=><SentHomeworkItem update={update} _id={item._id} url={item.url} name='training' grade={item.grade} student={item.student}/>)}
    </div>
  )
}
