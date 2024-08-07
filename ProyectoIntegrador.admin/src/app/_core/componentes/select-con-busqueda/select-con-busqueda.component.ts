import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectConBusquedaService } from './select-con-busqueda.service';


@Component({
    selector: 'app-select-con-busqueda',
    templateUrl: './select-con-busqueda.component.html',
    styleUrls: ['./select-con-busqueda.component.scss']
})
export class SelectConBusquedaComponent implements OnInit {
    @Input()
    set valueId(value: number) {
        this.selected = value;
        this.setFiltro(+value);
    }

    @Input() valueDefinicion = '';
    @Input() placeHolder = '';
    @Input() endPoint = '';
    @Input() large = false;

    @Output() cambio: EventEmitter<any> = new EventEmitter();

    items: any[];
    loading = false;
    textInput$ = new Subject<string>();
    selected: number = null;
    filtro: any;
    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: SelectConBusquedaService,
        private cdr: ChangeDetectorRef
    ) {
        this.setFiltro(+this.selected);
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            ngSelect: [this.selected, Validators.compose([Validators.nullValidator])]
        });

        this.filtro.criterio = '';
        this.service
            .get('', this.filtro)
            .pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.loading = false),
            ).subscribe(data => {
                this.items = data;
                this.cdr.detectChanges();
            });

        this.formGroup.get('ngSelect').valueChanges.subscribe(val => {
            this.enCambio(val);
            this.cdr.detectChanges();
        });

        this.loadData();
    }

    trackByFn(item: any) {
        return item.id;
    }

    enCambio(value: any) {
        this.setFiltro(+value);

        const descripcion = value && this.items ? this.items.find(o => o.id === value).descripcion : '';

        this.cambio.emit(value);
    }

    public marcarComoRequerido(esRequerido: boolean): void {
        const control = this.formGroup.get('ngSelect') as FormControl;

        if (esRequerido) {
            control.setValidators(Validators.required);
        } else {
            control.setValidators(Validators.nullValidator);
        }
        control.updateValueAndValidity();
    }

    public markAsTouch(): void {
        const control = this.formGroup.get('ngSelect') as FormControl;
        control.markAsTouched();
        control.markAsDirty();

        this.cdr.detectChanges();
    }

    public esInvalido(): boolean {
        const control = this.formGroup.get('ngSelect') as FormControl;
        return (control.invalid && (control.touched || control.dirty));
    }

    private setFiltro(value: number) {
        this.filtro = SelectConBusquedaService.defaultFilter();

        if (value && +value > 0) {
            this.filtro.filter.push({ criterio: 'seleccionadoId', valor: `${value}` });
        }
    }

    private loadData() {
        this.textInput$.pipe(
            debounceTime(800),
            distinctUntilChanged(),
            tap(() => this.loading = true),
            switchMap(term => this.service
                .get(this.endPoint, term, this.filtro)
                .pipe(
                    catchError(() => of([])), // empty list on error
                    tap(() => this.loading = false)
                )),
            ).subscribe(data => {
                this.items = data;
                this.cdr.detectChanges();
            });
    }
}
