import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _apiService: ApiService;
  constructor(
    private injector: Injector
  ) {
    this._apiService = this.injector.get(ApiService);
  }

}
