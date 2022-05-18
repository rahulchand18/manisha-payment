import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  rootURL = 'http://localhost:3000';
  registerUser(user:JSON){
    return this.http.post(this.rootURL+'/register',user)
  }

  loginUser(user:JSON){
    return this.http.post(this.rootURL+'/login',user,{
      withCredentials:true
    })
  }
  logOut(){
    // localStorage.setItem('isLoggedIn','false');    
    // localStorage.removeItem('token'); 
    return this.http.get(this.rootURL+'/logout',{withCredentials:true})
  }
  getUserData(email:string){
    return this.http.post(this.rootURL+'/getuser',{email})
  }
  editSave(data:any){
    return this.http.patch(this.rootURL+'/loggedin'+'/edit'+'/save',data,{withCredentials:true})
  }
  loggedin(){
    return this.http.get(this.rootURL+'/loggedin',{withCredentials:true})
  }
  upload(data:any){
    console.log(data)
    return this.http.post(this.rootURL+'/upload',data)
  }
}
