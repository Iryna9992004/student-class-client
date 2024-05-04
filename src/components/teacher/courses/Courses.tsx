import React,{useState,useContext,useEffect} from 'react';
import styles from './Course.module.css';
import CourseItem from './CourseItem';
import { Context } from '../../..';
import { ICourse } from '../../../models/ICourse';
import UserService from '../../../services/UserService';
import EmptyList from '../../empty-list/EmptyList';

export default function Courses() {
  const [name,setName]=useState<string>('');
  const [description, setDescription]=useState<string>('');
  const [courses, setCourses]=useState<ICourse[]>([]);
  const [reload,setReload]=useState(false)
  const [del,setDel]=useState(Date.now());
  const [ed,setEd]=useState(false)
  const {store}=useContext(Context)

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
  },[reload,del,ed])

  const deleteCourse=(bool:number)=>{
    setDel(bool)
  }
 
  return (
    <div className={styles.wrapper}>
      <input type="input" 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className={styles.shedule__text} 
      placeholder="Write a name of course:" />

      <input type="input"
      value={description} 
      onChange={(e)=>setDescription(e.target.value)}
      className={styles.shedule__text} 
      placeholder="Write a description of course:" />

      <div className={styles.add__options}>
          <button className={styles.shedule__button} onClick={()=>{store.addCourses(name,description); setReload(!reload); setName(''); setDescription('')}}>Add course</button>
      </div>
        
        <div className={styles.course__list} >
            {courses.length===0?<EmptyList text='Course list is empty!'/>:null}
            {courses.map(course=><CourseItem name={course.name} description={course.description} deleteCourse={deleteCourse}/>)}
        </div>
    </div>
  )
}
