import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private appService:AppService, private router:Router) { }

  ngOnInit(): void {
    this.appService.logOut().subscribe((res)=>{
      console.log(res);
      this.router.navigate(['login'])
    })
  }

}
