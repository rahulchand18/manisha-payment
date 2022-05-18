import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login-Register App';
  user:any;
  isValidUser : any = false;
  constructor(private appService: AppService, private router:Router){}
  ngOnInit(){
    this.appService.loggedin().subscribe((res)=>{
      this.user = res;
      this.isValidUser = this.user.isLoggedIn;
      console.log(this.isValidUser)
        });
      }
  
  logOut(){
    this.appService.logOut().subscribe((res)=>{
      console.log(res)
      this.isValidUser=false;
   })

    }

}
