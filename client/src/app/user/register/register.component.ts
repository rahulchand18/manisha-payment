import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit(): void {
  }
  message:any;
  registerUser(value:any){
    console.log(value)
    this.appService.registerUser(value).subscribe((data)=>{
      console.log(data)
      this.message = data;
    }) 
  }

}
