import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  user:any;
  userData: any;
  imgSrc:any;

  constructor(private router: Router, private appService:AppService) { }

  ngOnInit(): void {
    this.appService.loggedin().subscribe((res)=>{
      this.user = res
      this.userData = this.user.user
    });
    
  }
  editProfile(){
    this.router.navigate(['edit'])
  }
  
}
