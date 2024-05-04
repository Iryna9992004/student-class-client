import React,{useEffect,useContext} from 'react';
import {Context} from './index'
import {observer} from "mobx-react-lite"
import LoginForm from './components/login-form/LoginForm';
import styles from './App.module.css'
import TeacherInterface from './components/TeacherInterface';

function App() {
  const {store}=useContext(Context);
  let student=localStorage.getItem('student') && localStorage.getItem('token')?'student':null;
  let teacher=localStorage.getItem('teacher') && localStorage.getItem('token')?'teacher':null;
  let role=student || teacher || '';
  useEffect(()=>{
    if(localStorage.getItem('token') && localStorage.getItem('teacher')){
      store.checkAuth();
    }
    else if(localStorage.getItem('student') && localStorage.getItem('token')){
      store.checkAuthStud();
    }
  },[]);

  if(store.isLoading){
    return <div className={styles.loading__item}>Loading...</div>
  }

  if(!store.isAuth){
    return (
      <LoginForm />
    )
  } 

  return (
    <div className={styles.App}>
       <span>{store.isAuth ? <TeacherInterface role={role} />:''}</span> 
    </div>
  );
}

export default observer(App);
