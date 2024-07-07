import { Component, Input } from "@angular/core";
import { TvShow } from "../../interfaces/tv-show.interface";
import { Router } from "@angular/router";
import { TvShowService } from "../../services/tv-show.service";
import { DatePipe, NgIf } from "@angular/common";

@Component({
  selector: "app-favorite-tv-show",
  templateUrl: "./favorite-tv-show.component.html",
  styleUrl: "./favorite-tv-show.component.css",
  standalone: true,
  imports: [DatePipe, NgIf],
})
export class FavoriteTvShowComponent {
  @Input() tvShow!: TvShow;

  constructor(private router: Router, private tvShowService: TvShowService) {}

  onNavigateToDetails(tvShowId: number): void {
    this.router.navigate(["details", tvShowId]);
  }

  onToggleFavorites(tvShowId: number): void {
    this.tvShowService.toggleFavorite(tvShowId);
  }
}
