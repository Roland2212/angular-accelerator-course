import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { TvShow } from "../../interfaces/tv-show.interface";
import { Router } from "@angular/router";
import { DatePipe, NgIf } from "@angular/common";
import { CountdownPipe } from "../../pipe/countdown.pipe";
import { ToggleFavoriteDirective } from "../../directives/toggle-favorite.directive";

@Component({
  selector: "app-favorite-tv-show",
  templateUrl: "./favorite-tv-show.component.html",
  styleUrl: "./favorite-tv-show.component.css",
  standalone: true,
  imports: [DatePipe, NgIf, CountdownPipe, ToggleFavoriteDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteTvShowComponent {
  @Input() tvShow!: TvShow;

  constructor(private router: Router) {}

  onNavigateToDetails(tvShowId: number): void {
    this.router.navigate(["details", tvShowId]);
  }
}
