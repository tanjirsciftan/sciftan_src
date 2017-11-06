import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : String;
  password : String;

  constructor(private validateService: ValidateService,
              private flashMessagesService: FlashMessagesService,
              private routerService: Router,
              private authService: AuthService

            ) { }

  ngOnInit() {
  }


  OnLoginSubmit() {
    const user = {
      username:this.username,
      password:this.password
    }

    //Required Fields Validation
    if(!this.validateService.validateLogin(user))
    {
      this.flashMessagesService.show("Please fill in all fields",{cssClass:'alert-danger',timeout:3000});
      return;
    }

    this.authService.authenticateUser(user).subscribe(data => 
      {
        //console.log(data);
        if(data.success)
        {
          this.authService.storeUserData(data.token,data.user);          
          this.flashMessagesService.show("User logged in successfully",{cssClass:'alert-success',timeout:3000});
          this.routerService.navigate(['/dashboard']);
        }
        else
        {
          this.flashMessagesService.show(data.msg,{cssClass:'alert-danger',timeout:3000});
          this.routerService.navigate(['/login']);
        }
    })
  }

}
