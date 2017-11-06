import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : String;
  username : String;
  email : String;
  password : String;
  mobileno : String;
  

  constructor(private validateService: ValidateService,
              private flashMessagesService: FlashMessagesService,
              private authService: AuthService,
              private router: Router
             ) { }

  ngOnInit() {
  }

  OnRegisterSubmit() 
  {
    debugger;
    const user = {
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password,
      mobileno:this.mobileno
    }

    //Required Fields Validation
    if(!this.validateService.validateRegistration(user))
    {
      this.flashMessagesService.show("PLEASE FILL IN ALL FIELDS",{cssClass:'alert-danger',timeout:3000});
      return;
    }
  
    //Email Validation
    if(!this.validateService.validateEmail(user.email))
    {
      this.flashMessagesService.show("PLEASE ENTER VALID EMAIL",{cssClass:'alert-danger',timeout:3000});
      return;
    }

    //User Registration
    this.authService.registerUser(user).subscribe(data => {
      if(data.success)
      {
        this.flashMessagesService.show("User registered successfully and can log in",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/login']);
      }
      else
      {
        this.flashMessagesService.show("User registered failed",{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    })
  }

}
