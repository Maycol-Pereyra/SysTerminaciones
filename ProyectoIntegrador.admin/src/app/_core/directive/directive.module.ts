import { NgModule } from '@angular/core';
import { ImgFallbackDirective } from './app-img-fallback.directive';
import { DisableControlDirective } from './disable-control.directive';

@NgModule({
  imports: [],
  exports: [ImgFallbackDirective, DisableControlDirective],
  declarations: [ImgFallbackDirective, DisableControlDirective],
  providers: [],
})
export class DirectiveModule { }
