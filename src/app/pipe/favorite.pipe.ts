import { Pipe, PipeTransform } from "@angular/core";
import { GenericId } from "../interfaces/generic-type.interface";

@Pipe({
  name: "favorite",
  standalone: true,
})
export class FavoritePipe<T extends GenericId> implements PipeTransform {
  transform(value: T, items: T[]): boolean {
    const index = items.findIndex((item) => item.id === value.id);
    return index >= 0;
  }
}
