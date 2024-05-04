import $api from "../http/index";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { ICourse } from "../models/ICourse";
import {IShed} from '../models/IShed';
import { StudResponse } from "../models/response/StudResponse";

export default class UserService{
    static fetchUsers():Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users');
    }
    static fetchCourses():Promise<AxiosResponse<ICourse[]>>{
      return $api.get<ICourse[]>('/courses');
    }
    static fetchShedule():Promise<AxiosResponse<IShed[]>>{
      return $api.get<IShed[]>('/shedule');
    }
    static fetchStudent():Promise<AxiosResponse<StudResponse[]>>{
      return $api.get<StudResponse[]>('/students');
    }
}