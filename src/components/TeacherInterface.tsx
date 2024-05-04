import React,{useState,useContext} from 'react'
import styles from './TeacherInterface.module.css'
import { BiFoodMenu,BiLayer,BiCalendar } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import { LuBookMarked } from "react-icons/lu";
import { IoReaderOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { GrMenu } from "react-icons/gr";
import Training from './teacher/training/Training';
import GradeList from './teacher/grade/GradeList';
import Homework from './teacher/homework/Homework';
import SheduleForm from './teacher/shedule/SheduleForm';
import {Routes, Route, Link} from 'react-router-dom'
import Courses from './teacher/courses/Courses';
import { PiStudentBold } from "react-icons/pi";
import Students from './teacher/students/Students';
import { Context } from '..';
import UserMenu from './UserMenu';
import SSheduleForm from './students/shedule/SSheduleForm'
import SHomework from './students/homework/SHomework'
import STraining from './students/training/STraining'
import SGradeList from './students/grade/SGradeList'
import Welcome from './Welcome';
import { useLocation } from 'react-router-dom';

interface Role {
  role: string;
}

export default function TeacherInterface({ role }: Role) {
  const [isActive, setActive] = useState(false);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const { store } = useContext(Context);

  const toggle = isActive ? `${styles.l_navbar} ${styles.show}` : `${styles.l_navbar}`;
  const course = role === 'student' ? styles.hide : styles.nav__link;
  const course1 = role !== 'student' ? styles.hide : styles.nav__link;
  const course2 = role === 'student' ? styles.hide : styles.menu_icon;

  const changeParentState = (newValue: boolean) => {
    setMenu(newValue);
  };

  const handleLogout = (role: string) => {
    if (role === 'student') {
      store.logoutStudent();
    } else {
      store.logout();
    }
  };

  return (
    <div className={styles.sidebar__body}>
      <header className={styles.header} id="header">
        <div className={styles.header__toggle}>
          <GrMenu className={styles.header_toggle} style={{ color: 'gray' }} onClick={() => setActive(!isActive)} />
        </div>

        <div className={styles.header__img}>
          <BiFoodMenu className={course2} style={{ color: 'gray' }} onClick={() => setMenu(!menu)} />
        </div>
      </header>

      {menu && <UserMenu changeParentState={changeParentState} />}

      <div className={toggle}>
        <nav className={styles.nav}>
          <a href="#" className={styles.nav__logo} onClick={() => setActive(!isActive)}>
            <BiLayer className={styles.nav__logo_icon} />
            <span className={styles.nav__logo_name}>StudentClass</span>
          </a>

          <div className={styles.nav__list}>
            <Link to="/courses" className={location.pathname === '/courses' ? `${course} ${styles.active}` : course}>
              <LuBookMarked className={styles.nav__icon} />
              <span className={styles.nav_name}>My courses</span>
            </Link>

            <Link to="/shedule" className={location.pathname === '/shedule' ? `${course} ${styles.active}` : course}>
              <BiCalendar className={styles.nav__icon} />
              <span className={styles.nav_name}>Shedule</span>
            </Link>

            <Link to="/homework" className={location.pathname === '/homework' ? `${course} ${styles.active}` : course}>
              <FaBook className={styles.nav__icon} />
              <span className={styles.nav_name}>Homework</span>
            </Link>

            <Link to="/grades" className={location.pathname === '/grades' ? `${course} ${styles.active}` : course}>
              <IoBookmarksSharp className={styles.nav__icon} />
              <span className={styles.nav_name}>Grades</span>
            </Link>

            <Link to="/training" className={location.pathname === '/training' ? `${course} ${styles.active}` : course}>
              <IoReaderOutline className={styles.nav__icon} />
              <span className={styles.nav_name}>Learn more</span>
            </Link>

            <Link to="/students" className={location.pathname === '/students' ? `${course} ${styles.active}` : course}>
              <PiStudentBold className={styles.nav__icon} />
              <span className={styles.nav_name}>Students</span>
            </Link>
          </div>

          <Link to="/shedule_student" className={location.pathname === '/shedule_student' ? `${course1} ${styles.active}` : course1}>
            <BiCalendar className={styles.nav__icon} />
            <span className={styles.nav_name}>Shedule</span>
          </Link>

          <Link to="/homework_student" className={location.pathname === '/homework_student' ? `${course1} ${styles.active}` : course1}>
            <FaBook className={styles.nav__icon} />
            <span className={styles.nav_name}>Homework</span>
          </Link>

          <Link to="/grades_student" className={location.pathname === '/grades_student' ? `${course1} ${styles.active}` : course1}>
            <IoBookmarksSharp className={styles.nav__icon} />
            <span className={styles.nav_name}>Grades</span>
          </Link>

          <Link to="/training_student" className={location.pathname === '/training_student' ? `${course1} ${styles.active}` : course1}>
            <IoReaderOutline className={styles.nav__icon} />
            <span className={styles.nav_name}>Learn more</span>
          </Link>

          <Link to=" " className={styles.nav__link} onClick={() => handleLogout(role)}>
            <RiLogoutBoxLine className={styles.nav__icon} />
            <span className={styles.nav_name}>Log out</span>
          </Link>
        </nav>
      </div>

      <div className={styles.homework__container}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/shedule" element={<SheduleForm />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/grades" element={<GradeList />} />
          <Route path="/training" element={<Training />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />

          <Route path="/grades_student" element={<SGradeList />} />
          <Route path="/shedule_student" element={<SSheduleForm />} />
          <Route path="/training_student" element={<STraining />} />
          <Route path="/homework_student" element={<SHomework />} />
        </Routes>
      </div>
    </div>
  );
}
