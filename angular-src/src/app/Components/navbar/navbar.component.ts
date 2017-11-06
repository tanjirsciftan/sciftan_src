import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private validateService: ValidateService,
              private flashMessagesService: FlashMessagesService,
              private routerService: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLogoutClick()
  {    
    debugger;
    this.authService.logout();
    this.routerService.navigate(['/login']);
    return false;
  }
}
