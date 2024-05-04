import React,{useState,useContext} from 'react';
import { Context } from '../..';
import styles from './Login.module.css'

export default function StudentForm() {
    const [email, setEmail] =useState<string>('');
    const [password, setPassword] =useState<string>('');
    const {store}=useContext(Context);
  return (
    <div>
        <input className={styles.input__form1} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Login:" value={email} />
         <input  className={styles.input__form1} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password:" value={password} />
    <div className={styles.buttons2}>
  
        <button className={styles.btn1} onClick={()=>store.loginStudent(email,password)}>Login</button>
    </div></div>
  )
}
