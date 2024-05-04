import {IAuth} from "../IAuth"

export interface AuthStud{
    accessToken:string;
    refreshToken:string;
    student:IAuth;
}