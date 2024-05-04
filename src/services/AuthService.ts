import $api from "../http/index"
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { CourseResponse } from "../models/response/CourseResponse";
import { ShedResponse } from "../models/response/ShedResponse";
import { StudResponse } from "../models/response/StudResponse";
import { IFile } from "../models/IFile";
import { AuthStud } from "../models/response/AuthStud";


export default class AuthService{
   static async login(email:string, password:string):Promise<AxiosResponse<AuthResponse>>{
     return $api.post<AuthResponse>('/login',{email, password});
   }

   static async registration(email:string, password:string):Promise<AxiosResponse<AuthResponse>>{
    try {
      const response = await $api.post<AuthResponse>('/registration',{email, password});
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; 
    }
  }

   static async logout():Promise<void>{
     return $api.post('/logout');
   }

   static async addCourse(name:string, description:string):Promise<AxiosResponse<CourseResponse>>{
    return $api.post<CourseResponse>('/add_course',{name, description});
  }

  static async editCourse(name:string,newName:string,newDescription:string):Promise<AxiosResponse<CourseResponse>>{
    return $api.put<CourseResponse>('/edit_course',{name,newName,newDescription});
  }

  static async deleteCourse(name:string):Promise<void>{
    return $api.post('/delete_course',{name});
  }

  static async addShedule(date:Date,name:string,description:string,course:string){
    return $api.post('/add_shedule',{date,name,description,course});
  }

  static async deleteShedule(_id:string):Promise<void>{
    return $api.post('/delete_shedule',{_id});
  }

  static async editShedule(_id:string,newDate:Date,newName:string,newDescription:string,newCourse:string):Promise<AxiosResponse<ShedResponse>>{
    return $api.put<ShedResponse>('/edit_shedule',{_id,newDate,newName,newDescription,newCourse});
  }

  static async addStudent(name:string,login:string,password:string,course:string){
    return $api.post('/add_student',{name,login,password,course});
  }

  static async deleteStudent(_id:string):Promise<void>{
    return $api.post('/delete_student',{_id})
  }

  static async editStudent(_id:string,newName:string,newLogin:string,newPassword:string,newCourse:string):Promise<AxiosResponse<StudResponse>>{
    return $api.put('/edit_student',{_id,newName,newLogin,newPassword,newCourse});
  }

  static async sendFile(file:File):Promise<AxiosResponse<IFile>>{
    return $api.post<IFile>('/upload',{file});
  }
  
  static async deleteShedules(){
    return $api.delete('/delete_all_shedules');
  }

  static async deleteStudents(){
    return $api.delete('/delete_all_students')
  }

  static async deleteCourses(){
    return $api.delete('/delete_all_courses');
  }

  static async deleteHomeworks(){
    return $api.delete('/delete_all_homeworks');
  }

  static async deleteTrainings(){
    return $api.delete('/delete_all_training');
  }

  static async deleteAccount(){
    return $api.delete('/delete_my_account');
  }

  static async login_student(login:string, password:string):Promise<AxiosResponse<AuthStud>>{
    return $api.post<AuthStud>('/student_login',{login, password});
  }
  
  static async logout_student():Promise<void>{
    return $api.post('/student_logout');
  }

}