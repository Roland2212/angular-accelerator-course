import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService<T> {
  getItemByKey(key: string): T {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  setItemByKey(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }
}
