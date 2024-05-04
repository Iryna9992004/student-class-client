import React, { useState, useEffect,useContext} from 'react';
import styles from './Shedule.module.css';
import { IShed } from '../../../models/IShed';
import { ICourse } from '../../../models/ICourse';
import SheduleItem from './SheduleItem';
import UserService from '../../../services/UserService';
import { Context } from '../../..';
import EmptyList from '../../empty-list/EmptyList';

export default function SheduleForm() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [shedules,setShedules]=useState<IShed[]>([]);
  const [date1, setDate] = useState<Date>();
  const [name,setName]=useState<string>('');
  const [description,setDescription]=useState<string>('');
  const [subject,setSubject]=useState<string>('');
  const {store}=useContext(Context);
  const [reload,setReload]=useState(false)

  function addDate(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value;
    const d = new Date(dateValue);
    setDate(d);
  }
  
  async function getShedules(){
   try{
    const response=await UserService.fetchShedule();
    setShedules(response.data);
   }
   catch(e){
    console.log(e);
   }
  }

  function handleAddShedule() {
    if (date1 instanceof Date) {
      store.addShedule(date1, name, description,subject);
      setReload(!reload)
      setName('');
      setDescription('')
    } else {
      console.error('date1 is not a valid Date');
    }
  }

  async function fetchData() {
    try {
      const response = await UserService.fetchCourses();
      setCourses(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const del=()=>{
    setReload(!reload)
  }

  useEffect(() => {
    fetchData();
    getShedules();
  }, [reload]);

  return (
    <div className={styles.shedule__container}>
      <form className={styles.shedule__form}>
        <label>
          Choose a deadline:
          <input type="date" min="2017-04-01" max="2050-04-30" value={date1?.toISOString().split('T')[0]} onChange={addDate} className={styles.shedule__text} />
        </label>
        
        <select className={styles.shedule__text} value={subject} onChange={(e)=>setSubject(e.target.value)}>
          <option>Choose a course</option>
          {courses.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
        <input type="text" 
        placeholder="Write a name :"  
        className={styles.shedule__text} 
        value={name}
        onChange={(e)=>setName(e.target.value)}/>

        <input type="text" 
        placeholder="Write a description :" 
        className={styles.shedule__text} 
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
        
        <button className={styles.shedule__button} onClick={handleAddShedule} type="button">Add</button>
      </form>
      <div className={styles.shedule__list}>
        {shedules.length===0?<EmptyList text='Shedule list is empty!' />:null}
         {shedules.map(item=><SheduleItem del={del} _id={item._id} date={item.date} name={item.name} description={item.description}  course={item.course} key={item._id}/>)}
      </div>
    </div>
  );
}
