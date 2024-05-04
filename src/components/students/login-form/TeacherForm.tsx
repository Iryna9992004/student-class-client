import React,{useState,useContext} from 'react'
import styles from './Login.module.css'
import { Context } from '../../..';

export default function TeacherForm() {
    const [email, setEmail] =useState<string>('');
    const [password, setPassword] =useState<string>('');
    const {store}=useContext(Context);
  return (
    <div>
        <input className={styles.input__form1} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email:" value={email} />
         <input  className={styles.input__form1} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password:" value={password} />
    <div className={styles.buttons1}>
        <button className={styles.btn1} onClick={()=>store.registration(email,password)}>Registration</button>
        <button className={styles.btn1} onClick={()=>store.login(email,password)}>Login</button>
    </div></div>
  )
}
