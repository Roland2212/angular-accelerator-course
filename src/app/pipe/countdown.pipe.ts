import { Pipe, PipeTransform } from "@angular/core";
import { TvShowStatusE, TvShowStatusT } from "../interfaces/tv-show.interface";
import { formatDistanceToNow } from "date-fns";

@Pipe({
  name: "countdown",
  standalone: true,
})
export class CountdownPipe implements PipeTransform {
  transform(status: TvShowStatusT, airDate: string) {
    if (airDate) {
      return `Next episode in ${formatDistanceToNow(airDate)}`;
    }
    if (status !== TvShowStatusE.ENDED && status !== TvShowStatusE.CANCELED_ENDED) {
      return `${status}, but no next episode date`;
    }
    return "Show has ended";
  }
}
