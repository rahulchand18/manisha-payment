import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { LoggedinComponent } from '../loggedin/loggedin.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private appService: AppService, private router:Router) {}
  message:any;
  ngOnInit(): void {
   
  }
  
  loginUser(value: any) {
    
    this.appService.loginUser(value).subscribe((data) => {
      this.message = data;
      if(this.message.validUser){

        
        this.router.navigate(['loggedin']);
      }
      else{
       
        console.log("ok"+data);
        
      }
    });
  }
  

  
 
  
}
