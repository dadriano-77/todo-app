import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: { [key: string]: any } = {};

  get(key: string): any {
    return this.storage[key];
  }

  set(key: string, value: any): void {
    this.storage[key] = value;
  }

  remove(key: string): void {
    delete this.storage[key];
  }
}
