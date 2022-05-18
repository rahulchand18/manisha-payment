import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ConditionalExpr } from '@angular/compiler';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  imageSrc: any;
  value:Date= new Date("12/12/2022");
  constructor(private appService:AppService, private router: Router ){ }
  userData:any
  user:any;
  editedData:any;
  fileUploadForm: any;
  fileInputLabel: any;
  image:any;
  ngOnInit(): void {
    this.appService.loggedin().subscribe((res)=>{
      this.user = res
      this.userData = this.user.user;
      this.userData.dateOfBirth=this.userData.dateOfBirth.toString().split('T')[0];
      // this.value=new Date("12/12/2022")
      console.warn("Date:"+this.userData.dateOfBirth)
      this.imageSrc=`http://localhost:3000/image/${this.userData.img}`
      // this.imageSrc= `/home/rahul18/Desktop/Mynew/login-register/server/media/uploads/${this.userData.image}`
      if(!this.user.isLoggedIn){
        this.router.navigate(['login'])
        // console.log("horaaaa"+this.userData.isLoggedIn)
      }
      
    });
    
  }
  editSave(data:any){
    // console.log(data)
    
    this.editedData={
      firstName: data.firstName,
      lastName: data.lastName,
   
      phone:data.phone,
      age:data.age,
      about:data.about,
      dateOfBirth: data.dateOfBirth,
      address:{
        street:data.street,
        city:data.city,
        state:data.state
      },
      image: this.image
    }
    let formData = new FormData()
    for (let key in this.editedData) {
      console.log(key)
      if(key==='address'){
        console.log(this.editedData.address)
        for (let addrKey in this.editedData.address){
          formData.append(`address[${addrKey}]`,this.editedData[key][addrKey])
        }
      }
      else{

        formData.append(key, this.editedData[key]);
      }
   }
    
    this.appService.editSave(formData).subscribe((res)=>{
      // console.log(res)
      this.router.navigate(['loggedin'])
      
    })
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        console.log(file)
      console.log("changed")
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
        this.image=file;
    }
    
  
  }
  
  
  
}
