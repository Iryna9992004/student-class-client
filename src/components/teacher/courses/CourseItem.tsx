import React,{useState,useContext} from 'react'
import styles from './Course.module.css'
import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import CourseDelete from './CourseDelete';
import CourseEdit from './CourseEdit';

interface CourseInterface{
  name:string;
  description:string;
  deleteCourse: (keyword: number) => void
}
export default function CourseItem({name, description,deleteCourse}:CourseInterface) {
  const [edit,setEdit]=useState<boolean>(false);
  const [deleteItem,setDelete]=useState<boolean>(false);

  function del(){
    setDelete(!deleteItem);
    setEdit(false);
  }

  function ed(){
   setEdit(!edit);
   setDelete(false);
  }

  return (
    <div>
    <div className={styles.homework__item}>
          <div className={styles.homework__information}>
            <span className={styles.homework__course}>{name}</span>
            <span className={styles.homework__description}> Description: {description}</span>
          </div>
          <MdDeleteOutline className={styles.icon__down} onClick={del} />
          <RiEdit2Fill onClick={ed} className={styles.icon__down} />
    </div>

     {deleteItem?<CourseDelete deleteCourse={deleteCourse} del={del}/>:''}
     {edit?<CourseEdit editCourse={deleteCourse} ed={ed}/>:''}
    </div>
  )
}
