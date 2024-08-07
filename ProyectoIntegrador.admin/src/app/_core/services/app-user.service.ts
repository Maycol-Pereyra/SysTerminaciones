import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AppConfig } from './app-config.service';

@Injectable()
export class UserService {
    public url = '';

    constructor(private http: HttpClient) {
        this.url = `${AppConfig.settings.api}/api/generales/admin/usuario-admin`;
    }

    getAll() {
        return this.http.get<User[]>(this.url);
    }

    getById(id: number) {
        return this.http.get<User>(this.url + '/${id}');
    }
}
