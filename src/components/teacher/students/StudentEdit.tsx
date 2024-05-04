import React,{useContext,useState,useEffect} from 'react'
import styles from './Student.module.css'
import { Context } from '../../..';
import { ICourse } from '../../../models/ICourse';
import UserService from '../../../services/UserService';

interface IStudent{
    _id:string;
    rel:()=>void;
    ed:()=>void;
}
export default function StudentEdit({_id,rel,ed}:IStudent) {

   const [courses, setCourses] = useState<ICourse[]>([]);
   const [newSubject,setSubject]=useState<string>('');
   const [newLogin,setLogin]=useState<string>('');
   const [newName,setEv]=useState<string>('');
   const [newPassword,setPassword]=useState<string>('');
   const {store}=useContext(Context);
  
   async function getCourses(){
    try{
      const response=await UserService.fetchCourses();
      setCourses(response.data)
    }
    catch(e){
        console.log(e);
    }
   }

  useEffect(()=>{
    getCourses();
  },[])

  return (
    <div className={styles.homework__item}>
    <div className={styles.add__options1}>

       <input type="input" 
          value={newName}
          onChange={(e)=>setEv(e.target.value)}
          className={styles.shedule__text} 
          placeholder="Write NEW name of student:" />

       <input type="input"
          value={newLogin}
          onChange={(e)=>setLogin(e.target.value)}
          className={styles.shedule__text} 
          placeholder="Write a NEW login:" />
        
        <input type="input" 
          value={newPassword}
          onChange={(e)=>setPassword(e.target.value)}
          className={styles.shedule__text} 
          placeholder="Write new passoword:" />

      <select className={styles.shedule__text} value={newSubject} onChange={(e)=>setSubject(e.target.value)}>
      <option>Choose a course</option>
          {courses.map((item) => (
            <option>{item.name}</option>
          ))}
        </select>

        <button className={styles.shedule__button} onClick={()=>{store.editStudent(_id,newLogin,newName,newPassword,newSubject);rel();ed()}}>Edit</button>
    </div>
    </div>
  )
}
