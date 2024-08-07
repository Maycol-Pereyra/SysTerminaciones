import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
