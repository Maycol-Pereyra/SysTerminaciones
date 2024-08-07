import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { User } from 'src/app/_core/models/user.model';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user$: Observable<User>;

  constructor(private layout: LayoutService, private advAuth: AuthenticationService) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.user$ = this.advAuth.currentUserSubject.asObservable();
  }

  logout() {
    this.advAuth.logout();
    document.location.reload();
  }
}
