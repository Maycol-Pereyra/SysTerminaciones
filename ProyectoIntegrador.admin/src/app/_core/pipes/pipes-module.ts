import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaskCedulaPipe } from './mask-cedula.pipe';
import { MaskNumeroPipe } from './mask-numero.pipe';
import { MaskTelefonoPipe } from './mask-telefono.pipe';

import { ValorAsignadoPipe } from './texto-asignado.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [
    ValorAsignadoPipe,
    MaskTelefonoPipe,
    MaskCedulaPipe,
    MaskNumeroPipe
  ],
  declarations: [
    ValorAsignadoPipe,
    MaskTelefonoPipe,
    MaskCedulaPipe,
    MaskNumeroPipe
  ],
  providers: [],
})
export class PipeModule { }
