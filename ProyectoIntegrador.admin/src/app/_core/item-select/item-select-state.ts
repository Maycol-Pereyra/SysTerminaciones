import { ItemSelectFilter } from './item-select-filter';

export interface ItemSelectState {
    filter: ItemSelectFilter [];
    pageNumber: number;
    pageSize: number;
    orderBy: string;
    criterio: string;
}

