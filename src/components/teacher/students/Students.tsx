import React,{useState,useContext,useEffect} from 'react';
import styles from './Student.module.css';
import StudentItem from './StudentItem';
import UserService from '../../../services/UserService';
import { StudResponse } from '../../../models/response/StudResponse';
import { ICourse } from '../../../models/ICourse';
import { Context } from '../../..';
import EmptyList from '../../empty-list/EmptyList';

export default function Students() {
  const [students,setStudents]=useState<StudResponse[]>([]);
  const [courses,setCourses]=useState<ICourse[]>([]);
  const [name,setName]=useState<string>('');
  const [login,setLogin]=useState<string>('');
  const [course,setCourse]=useState<string>('');
  const [password,setPassword]=useState<string>('');
  const {store}=useContext(Context);
  const [reload, setReload]=useState(false)

  async function getStudents(){
    try{
     const response=await UserService.fetchStudent();
     setStudents(response.data);
    }
    catch(e){
     console.log(e);
    }
  }

  async function getCourses(){
    try{
      const response=await UserService.fetchCourses();
      setCourses(response.data);
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getCourses();
    getStudents();
  },[reload])

  const rel=()=>setReload(!reload);

  return (
    <div className={styles.wrapper}>
         <input type="input" 
         value={name}
         onChange={(e)=>setName(e.target.value)}
         className={styles.shedule__text} 
         placeholder="Write a name of student:" />

         <input type="input"
         value={login} 
         onChange={(e)=>setLogin(e.target.value)}
         className={styles.shedule__text} 
         placeholder="Write a login of student:" />

         <input type='input'
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         className={styles.shedule__text} 
         placeholder="Write a password of student:" />

         <select className={styles.shedule__text} value={course} onChange={(e)=>setCourse(e.target.value)}>
         <option>Choose a course</option>
            {courses.map(item=><option>{item.name}</option>)}
        </select>
        <button type="button" className={styles.shedule__button} onClick={()=>{store.addStudent(name,login,password,course);setReload(!reload);setLogin('');setName('');setPassword('')}}>Add to course</button>

        <div className={styles.student__list}>
          {students.length===0?<EmptyList text='Student list is empty!' />:null}
          {students.map(item=><StudentItem rel={rel} _id={item._id} name={item.name} login={item.login} course={item.course}/>)}
        </div>
    </div>
  )
}
