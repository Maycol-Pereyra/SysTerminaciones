import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicAsideMenuConfig } from '../../configs/dynamic-aside-menu.config';
import { FeatureFlagService } from '../../../_core/services/feature-flag.service';

const emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class DynamicAsideMenuService {
  menuConfig$: Observable<any>;

  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);

  constructor(public featureFlagService: FeatureFlagService) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.loadMenu();
  }

  // Here you able to load your menu from server/data-base/localStorage
  // Default => from DynamicAsideMenuConfig
  private loadMenu() {
    this.setMenu(DynamicAsideMenuConfig);
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
}
