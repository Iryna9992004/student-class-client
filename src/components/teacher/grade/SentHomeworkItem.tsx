import React,{useState,useEffect} from 'react'
import styles from './Grade.module.css'
import { MdDeleteOutline } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { IGrade } from '../../../models/IGrade';
import $api from '../../../http';

interface SentHomeworkItemProps {
  _id: string;
  url: string;
  name: string;
  grade: string;
  student: string;
  update: () => void;
}

export default function SentHomeworkItem({_id,url,name,grade,student,update}:SentHomeworkItemProps) {
  const [newGrade,setGrade]=useState<string>('0');

  async function ChangeGrade(){
    try{
      if(name==='homework'){
        const graded=await $api.post('/add_grade_homework',{_id,newGrade});
        console.log(graded);
        update()
      }
      else{
        const graded=await $api.post('/add_grade_training',{_id,newGrade});
        console.log(graded);
      }
      
    }
    catch(e){
      console.log(e);
    }
  }

  async function deleteGrade(){
    try{
      if(name==='homework'){
        const deleted=await $api.post('/delete_homework_grade',{_id,newGrade});
        console.log(deleted);
        update()
      }
      else{
        const deleted=await $api.post('/delete_training_grade',{_id,newGrade});
        console.log(deleted);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div className={styles.sent__homework__item}>
      <a href={url}><FaFile style={{fontSize:'20',color:'gray',cursor:'pointer'}}/></a>
       <span>Student name: {student}</span>
       <span>Grade: {grade}</span>
       <select onChange={(e)=>setGrade(e.target.value)}>
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
         <option>6</option>
         <option>7</option>
         <option>8</option>
         <option>9</option>
         <option>10</option>
       </select>
       <IoIosSave style={{fontSize:'30',color:'gray',cursor:'pointer'}} onClick={ChangeGrade}/>
       <MdDeleteOutline style={{fontSize:'30',color:'gray',cursor:'pointer'}} onClick={deleteGrade}/>
    </div>
  )
}
