import React, { useState, useEffect } from 'react';
import styles from './Homework.module.css';
import UserService from '../../../services/UserService';
import $api from '../../../http';


export default function FileUpload({reload}) {
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [showSubjects, setShowSubjects] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('subject', subject);
    formData.append('teacher', teacher);

    try {
      const response = await $api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Файл успішно завантажено:', response.data);
    } catch (error) {
      console.error('Помилка завантаження файлу:', error);
    }
  };

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await UserService.fetchCourses();
        setCourses(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getCourses();
  }, [showSubjects]);

  

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.shedule__form}>
        <input
          type="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.shedule__text}
          placeholder="Write a name of homework..."
        />
        <input
          type="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.shedule__text}
          placeholder="Write a description of homework..."
        />
        <input
          type="input"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className={styles.shedule__text}
          placeholder="Write an email of teacher..."
        />
        <select
          className={styles.shedule__text}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onClick={() => setShowSubjects(!showSubjects)}
        >
          <option>Choose a course</option>
          {courses.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>

        <div className={styles.upload__file}>
          <input type="file" onChange={handleFileChange} />
          <button className={styles.shedule__button} onClick={()=>{reload()}}>
            Завантажити
          </button>
        </div>
      </form>
    </div>
  );
}