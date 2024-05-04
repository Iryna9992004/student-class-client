import React, { useState, useEffect} from 'react';
import styles from './Shedule.module.css';
import UserService from '../../../services/UserService';
import { IShed } from '../../../models/IShed';
import SheduleItem from './SSheduleItem';
import EmptyList from '../../empty-list/EmptyList';

export default function SheduleForm() {
  const [shedules,setShedules]=useState<IShed[]>([]);
  async function getShedules(){
    try{
     const response=await UserService.fetchShedule();
     setShedules(response.data);
    }
    catch(e){
     console.log(e);
    }
   }

  useEffect(() => {
    getShedules();
  }, []);

  return (
    <div className={styles.shedule__container}>
      <div className={styles.shedule__list}>
      {shedules.length===0?<EmptyList text='Shedule list is empty!'/>:null}
      {shedules.map(item=><SheduleItem _id={item._id} date={item.date} name={item.name} description={item.description}  course={item.course} key={item._id}/>)}
      </div>
    </div>
  );
}
