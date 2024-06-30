import { Pipe, PipeTransform } from "@angular/core";
import { GenericId } from "../interfaces/generic-type.interface";

@Pipe({
  name: "isFavorite",
  standalone: true,
  pure: false,
})
export class IsFavoritePipe<T extends GenericId> implements PipeTransform {
  transform(value: T, ids: T[]): boolean {
    const index = ids.findIndex((id) => id === value);
    return index >= 0;
  }
}
