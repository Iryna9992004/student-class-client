import React, { useRef, useState } from 'react';
import styles from './Homework.module.css';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosCloudDownload } from "react-icons/io";
import $api from '../../../http';

interface HomeworkItemProps {
  _id: string;
  name: string;
  course: string;
  description: string;
  link: string;
}

export default function HomeworkItem({ _id, name, link, course, description }: HomeworkItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const addTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('_id', _id);

        const response = await $api.post('/student_homework_download', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.homework__item}>
      <a href={link}><IoIosCloudDownload className={styles.icon__down} /></a>
      <div className={styles.homework__information}>
        <span className={styles.homework__course}>Course: {course}</span>
        <span className={styles.homework__description}> Name: {name}</span>
        <span className={styles.homework__description}> Description: {description}</span>
      </div>
      <div className={styles.upload__label} onClick={handleUploadClick}>
        <input
          id="file-upload"
          type="file"
          className={styles.upload__input}
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <a href="#" style={{ fontSize: 50, color: 'gray' }}>
          <AiOutlineCloudUpload className={styles.icon__up} />
        </a>
      </div>
      <button onClick={addTraining}>Send</button>
    </div>
  );
}
