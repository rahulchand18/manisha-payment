import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor( private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    
    if (this.isLoggedIn()) {      
      return true;    
      console.log('j')  
      }      
      // navigate to login page as user is not authenticated      
   else
   {
    console.log('h')
     this.router.navigate(['/login']);      
     return false;
    }
  }
  
  // this.router.navigate(['login'])

public isLoggedIn():boolean{

  let status = false;      
  if (localStorage.getItem('isLoggedIn') == "true") {      
     status = true;      
  }
    else {      
     status = false;      
     }      
  return status;      
  }   
} 
    