import React,{useContext} from 'react'
import styles from './Welcome.module.css'
import { Context } from '..'

export default function Welcome() {
  const {store}=useContext(Context);
  return (
    <div className={styles.welcome__container}><h1 className={styles.welcome}>Welcome to StudentClass</h1>
    <span className={styles.wishes}> Don't forget that your best wishes are always with you and that you can use them as your motivation to achieve more. So just keep going, and don't be afraid to ask for help when you need it. You're capable of so much more than you think, and you'll be able to achieve anything you put your mind to. So make the most of every opportunity, and never give up on your dreams!</span>
    {!store.isActivate?<span style={{marginTop:10,color:'red'}}>To be able to use this aplication, please confirm your email address</span>:''}
    </div>
  )
}
