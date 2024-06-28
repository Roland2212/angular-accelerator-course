import { Pipe, PipeTransform } from "@angular/core";
import { TvShow } from "../interfaces/tv-show.interface";

@Pipe({
  name: "countSeasons",
  standalone: true,
})
export class CountSeasonsPipe implements PipeTransform {
  transform(tvShow: TvShow): number {
    const { episodes } = tvShow;
    let seasonsAmount = 0;
    let currentSeason = 0;

    if (!episodes.length) return seasonsAmount;

    episodes.forEach((item) => {
      if (currentSeason !== item.season) {
        currentSeason = item.season;
        seasonsAmount++;
      }
    });

    return seasonsAmount;
  }
}
