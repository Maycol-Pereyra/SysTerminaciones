import { Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DateHelper } from '../../../_core/helpers/date.helper';
import { NumberHelper } from '../../../_core/helpers/number.helper';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string | null): NgbTimeStruct | null {
    if (value === null || value === undefined || value === '' || value.length < 8) {
      return null;
    }

    const hour = NumberHelper.obtenerValorNumerico(value.substr(0, 2));
    const minute = NumberHelper.obtenerValorNumerico(value.substr(3, 2));
    const meridiano = value.substr(6, 2);

    return {
      hour: DateHelper.equivalencia24Hora(hour, meridiano),
      minute,
      second: 0
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    let meridiano = '';

    if (time != null) {
      meridiano = time.hour >= 12 ? 'PM' : 'AM';
    }

    return time != null ? `${pad(DateHelper.equivalencia12Hora(time.hour))}:${pad(time.minute)} ${meridiano}` : '';
  }
}
