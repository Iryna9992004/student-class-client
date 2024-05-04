import React,{useState} from 'react';
import styles from './Login.module.css'
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';

export default function LoginForm() {
    const [role,setRole]=useState<boolean>(true);
    
    return (
    <body className={styles.login__body}>
    <div className={styles.login__wrapper1}>
      <h1 className={styles.header}>MyDiary</h1>
       <div className={styles.role} ><a href="#" onClick={()=>setRole(true)}>Teacher</a>
        / <a href="#" onClick={()=>setRole(false)}>Student</a></div>
       {role?<TeacherForm />:<StudentForm />}
    </div>
    </body>
  )
}
