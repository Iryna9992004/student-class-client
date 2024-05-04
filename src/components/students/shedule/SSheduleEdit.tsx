import React,{useContext, useState,useEffect} from 'react'
import styles from './Shedule.module.css'
import { ICourse } from '../../../models/ICourse';
import UserService from '../../../services/UserService';
import { Context } from '../../..';

interface ID{
  _id:string;
}
export default function SheduleEdit({_id}:ID) {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [newSubject,setSubject]=useState<string>('');
  const [newName,setEv]=useState<string>('');
  const [newDescription,setDescription]=useState<string>('');
  const {store}=useContext(Context);
  const [date1, setDate] = useState<Date>();
  
  function addDate(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value;
    const d = new Date(dateValue);
    setDate(d);
  }
  async function getShedules(){
    try{
     const response=await UserService.fetchCourses();
     setCourses(response.data);
    }
    catch(e){
     console.log(e);
    }
   }
  
  function handleAddShedule() {
    if (date1 instanceof Date) {
      store.editShed(_id,date1,newName,newDescription,newSubject);
    } else {
      console.error('date1 is not a valid Date');

    }
  }
  useEffect(()=>{
    getShedules();
  })
  
  return (
    <div className={styles.homework__item}>
    <div className={styles.add__options}>

       <input type="date" 
          onChange={addDate}
          className={styles.shedule__text} 
          placeholder="Write NEW name of course:" />

      <select className={styles.shedule__text} value={newSubject} onChange={(e)=>setSubject(e.target.value)}>
          {courses.map((item) => (
            <option>{item.name}</option>
          ))}
        </select>

         <input type="input"
          value={newName}
          onChange={(e)=>setEv(e.target.value)}
          className={styles.shedule__text} 
          placeholder="Write a new name of event:" />

       <input type="input" 
          value={newDescription}
          onChange={(e)=>setDescription(e.target.value)}
          className={styles.shedule__text} 
          placeholder="Write new description of event:" />

        <button className={styles.shedule__button} onClick={handleAddShedule}>Edit</button>
    </div>
    </div>
  )
}
