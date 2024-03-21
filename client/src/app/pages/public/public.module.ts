import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MATERIAL_MODULE } from 'src/app/core/constants/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, PageNotFoundComponent, RegisterComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ...MATERIAL_MODULE,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class PublicModule {}
