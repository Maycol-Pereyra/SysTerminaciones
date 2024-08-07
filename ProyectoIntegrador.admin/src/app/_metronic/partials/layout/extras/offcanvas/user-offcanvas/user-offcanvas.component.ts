import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { User } from 'src/app/_core/models/user.model';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<User>;

  constructor(private layout: LayoutService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
