import { Component } from "@angular/core";
import { TvShowService } from "../../services/tv-show.service";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Observable } from "rxjs";
import { TvShow } from "../../interfaces/tv-show.interface";
import { IsFavoritePipe } from "../../pipe/is-favorite.pipe";
import { TvShowCardComponent } from "../../components/tv-show-card/tv-show-card.component";
import { CountdownPipe } from "../../pipe/countdown.pipe";
import { ToggleFavoriteDirective } from "../../directives/toggle-favorite.directive";
import { Router } from "@angular/router";

@Component({
  selector: "app-favorites-view",
  templateUrl: "./favorites.component.html",
  styleUrl: "./favorites.component.css",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, IsFavoritePipe, TvShowCardComponent, CountdownPipe, ToggleFavoriteDirective],
})
export class FavoritesViewComponent {
  tvShows$: Observable<TvShow[]> = this.tvShowService.getFavoritesTvShows();

  constructor(private router: Router, private tvShowService: TvShowService) {}

  onNavigateToDetails(tvShowId: number): void {
    this.router.navigate(["details", tvShowId]);
  }

  trackById(_: number, tvShow: TvShow): number {
    return tvShow.id;
  }
}
