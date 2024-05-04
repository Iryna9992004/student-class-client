import React from 'react'
import styles from './empty-list.module.css'

export default function EmptyList({text}:{text:String}) {
  return (
    <div className={styles.title__container}>
        <div className={styles.text}>{text}</div>
    </div>
    
  )
}
