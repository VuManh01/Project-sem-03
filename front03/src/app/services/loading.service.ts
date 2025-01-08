import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  private isGlobalLoading = new BehaviorSubject<boolean>(false);

  // Observable cho phép các component khác subscribe
  isGlobalLoading$ = this.isGlobalLoading.asObservable();

  // Hàm để thay đổi giá trị
  setGlobalLoading(value: boolean): void {
    this.isGlobalLoading.next(value);
  }
}
