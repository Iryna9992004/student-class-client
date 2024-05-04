import React,{useContext,useState} from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import styles from './Student.module.css';
import { Context } from '../../..';
import StudentEdit from './StudentEdit';

interface StudentI{
  _id:string;
  name:string;
  login:string;
  course:string;
  rel:()=>void
}
export default function StudentItem({_id,name,login,course,rel}:StudentI) {
  const {store}=useContext(Context);
  const [edit,setEdit]=useState<boolean>(false);

  return (
    <div>
    <div className={styles.homework__item} id={_id}>
    <div className={styles.homework__information}>
      <div>
         <span className={styles.homework__course}>Name: </span>
         <span className={styles.homework__description}>{name}</span>
      </div>
      <div>
         <span className={styles.homework__course}>Login:</span>
         <span className={styles.homework__description}>{login}</span>
      </div>
      <div>
         <span className={styles.homework__course}>Course:</span>
         <span className={styles.homework__description}>{course}</span>
      </div>
    </div>
    <div>
        <MdDeleteOutline className={styles.icon__down} onClick={()=>{store.deleteStudent(_id);}}/>
        <RiEdit2Fill className={styles.icon__down} onClick={()=>{setEdit(!edit);rel()}}/>
    </div>
  </div>
    <div>
      {edit?<StudentEdit ed={()=>setEdit(false)} rel={rel} _id={_id}/>:" "}
    </div>
</div>
  )
}
