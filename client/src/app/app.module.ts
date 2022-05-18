import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { LoggedinComponent } from './user/loggedin/loggedin.component';
import { AuthGuard } from './guardds/auth.guard';
import { EditComponent } from './user/loggedin/edit/edit.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    LoggedinComponent,
    EditComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AppService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
