import { Component } from "@angular/core";
import { TvShowService } from "../../services/tv-show.service";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Observable } from "rxjs";
import { TvShow } from "../../interfaces/tv-show.interface";
import { IsFavoritePipe } from "src/app/pipe/is-favorite.pipe";
import { FavoriteTvShowComponent } from "../../components/favorite-tv-show/favorite-tv-show.component";

@Component({
  selector: "app-favorites-view",
  templateUrl: "./favorites.component.html",
  styleUrl: "./favorites.component.css",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, IsFavoritePipe, FavoriteTvShowComponent],
})
export class FavoritesViewComponent {
  tvShows$: Observable<TvShow[]> = this.tvShowService.getFavoritesTvShows();

  constructor(private tvShowService: TvShowService) {}

  trackById(_: number, tvShow: TvShow): number {
    return tvShow.id;
  }
}
