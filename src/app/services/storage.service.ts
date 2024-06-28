import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService<T> {
  getItemByKey(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  setItemByKey(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }
}
