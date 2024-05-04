import {IUser} from "../models/IUser"
import {makeAutoObservable} from "mobx"
import AuthService from "../services/AuthService";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { AuthStud } from "../models/response/AuthStud";
import { API_URL } from "../http";
import { IStud } from "../models/IStud";
import { IAuth } from "../models/IAuth";

export default class Store{
    user={} as IUser;
    student={} as IAuth;
    isAuth=false;
    isLoading=false; 
    isStudent=false;
    editOrDelete=false;
    isActivate=false;

    constructor(){
      makeAutoObservable(this);
    }

    setAuth(bool:boolean){
        this.isAuth=bool;
    }
    setActivated(bool:boolean){
      this.isActivate=bool;
    }
    setUser(user:IUser){
       this.user=user; 
    }
    setStudent1(student:IAuth){
      this.student=student; 
    }
    setLoading(bool:boolean){
      this.isLoading=bool;
    }
    setStudent(bool:boolean){
      this.isStudent=bool;
    }

    setEditOrDelete(){
      this.editOrDelete=!this.editOrDelete;
    }
    
    setDel(){
      this.setEditOrDelete()
    }
    async checkAuth(){
      this.setLoading(true);
      try{
        let refreshToken=localStorage.getItem('token')
        const response=await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true})
        console.log(response);
        localStorage.setItem('token',response.data.accessToken);
        localStorage.setItem('teacher','teacher')
        this.setAuth(true);
        console.log(this.isAuth)
        this.setStudent(false);
        this.setUser(response.data.user);
        this.setActivated(response.data.user.isActivate)
      }
      catch(e){
        console.log(e);
      }
      finally{
        this.setLoading(false);
      }
    }
    
    async checkAuthStud() {
      this.setLoading(true);
      try {
        const response = await axios.get<AuthStud>(`${API_URL}/student_refresh`, { withCredentials: true });
        console.log(response);
        localStorage.setItem('student', response.data.accessToken);
        this.setAuth(true);
        this.setStudent(true);
        this.setStudent1(response.data.student);
      } catch (e) {
        console.log(e);
      } finally {
        this.setLoading(false);
      }
    }
    async login(email:string, password:string){
      this.setLoading(true);
        try{
          const response=await AuthService.login(email,password);
          console.log(response);
          localStorage.setItem('token',response.data.accessToken);
          localStorage.setItem('teacher','teacher');
          this.setAuth(true);
          this.setUser(response.data.user);
          this.setActivated(response.data.user.isActivate)
        }
        catch(e){
          console.log(e);
        }
        finally {
          this.setLoading(false);
        }
    }

    async registration(email:string, password:string){
      try {
          const response = await AuthService.registration(email, password);
          if (response && response.data && response.data.user) {
              console.log(response.data.user);
              localStorage.setItem('token', response.data.accessToken);
              this.setAuth(true);
              this.setUser(response.data.user);
              this.setActivated(response.data.user.isActivate);
          } else {
              console.error("Invalid response format:", response);
          }
      } catch (e) {
          console.error("Error during registration:", e);
      }
  }

    async logout(){
      try{
        const response=await AuthService.logout();
        console.log(response);
        localStorage.removeItem('token');
        this.setAuth(false);
        this.setUser({} as IUser)
      }
      catch(e){
          console.log(e);
      }
    }

    async addCourses(name:string, description:string){
        try{
          if(!this.isActivate) return
          const response=await AuthService.addCourse(name,description);
          console.log(response);
        }
        catch(e){
          console.log(e);
        }
    }

    async editCourse(name:string,newName:string,newDescription:string){
      try{
        if(!this.isActivate) return
        const response=await AuthService.editCourse(name,newName,newDescription);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async deleteCourse(name:string){
      try{
        if(!this.isActivate) return
        const response=await AuthService.deleteCourse(name);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async addShedule(date:Date,name:string,description:string,course:string){
      try{
        if(!this.isActivate) return
       const response=await AuthService.addShedule(date,name,description,course);
       console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async deleteShed(_id:string){
      try{
        if(!this.isActivate) return
        const response=await AuthService.deleteShedule(_id);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async editShed(_id:string,newDate:Date,newName:string,newDescription:string,newCourse:string){
      try{
        if(!this.isActivate) return
       const response=await AuthService.editShedule(_id,newDate,newName,newDescription,newCourse);
       console.log(response);
      }
      catch(e){
       console.log(e);
      }
    }

    async addStudent(name:string,login:string,password:string,course:string){
      try{
        if(!this.isActivate) return
        const response=await AuthService.addStudent(name,login,password,course);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async deleteStudent(_id:string){
      try{
        if(!this.isActivate) return
        const response=await AuthService.deleteStudent(_id);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async editStudent(_id:string,newName:string,newLogin:string,newPassword:string,newCourse:string){
      try{
        if(!this.isActivate) return
        const response=await AuthService.editStudent(_id,newName,newLogin,newPassword,newCourse);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async sendFile(file: File) {
      try {
        if(!this.isActivate) return
        const response = await AuthService.sendFile(file);
        console.log('File uploaded:', response);
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('File upload failed');
      }
    }

    async deleteShedules(){
      try{
        if(!this.isActivate) return
       const response =await AuthService.deleteShedules();
       console.log(response);;
      }
      catch(e){
        console.log(e);
      }
    }

    async deleteStudents(){
      try{
        if(!this.isActivate) return
       const response=await AuthService.deleteStudents();
       console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async deleteCourses(){
      try{
        if(!this.isActivate) return
        const response=await AuthService.deleteCourses();
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async deleteHomeworks(){
      try{
        if(!this.isActivate) return
       const response=await AuthService.deleteHomeworks();
       console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }

    async deleteTrainings(){
      try{
        if(!this.isActivate) return
       const response=await AuthService.deleteTrainings();
       console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }
    async deleteAccont(){
      try{
        const response=await AuthService.deleteAccount();
        console.log(response);
      } 
      catch(e){
        console.log(e);
      }
    }
    async loginStudent(login:string,password:string){
      try{
        const response=await AuthService.login_student(login,password);
        localStorage.setItem('student','student');
        localStorage.setItem('token',response.data.accessToken)
        this.setStudent(true);
        this.setAuth(true);
        console.log(response.data.student);
      }
      catch(e){
        console.log(e);
      }
    }

    async logoutStudent(){
      try{
        const response=await AuthService.logout_student();
        localStorage.removeItem('student');
        this.setAuth(false);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }
}