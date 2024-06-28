import { DatePipe, DecimalPipe, I18nPluralPipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { TvShow } from "../../interfaces/tv-show.interface";
import { CountSeasonsPipe } from "../../pipe/count-seasons.pipe";

@Component({
  selector: "app-tv-show-details",
  standalone: true,
  imports: [DatePipe, DecimalPipe, I18nPluralPipe, CountSeasonsPipe],
  templateUrl: "./tv-show-details.component.html",
  styleUrl: "./tv-show-details.component.css",
})
export class TvShowDetailsComponent {
  @Input() tvShow!: TvShow;

  constructor(private router: Router) {}

  onNavigateBack(): void {
    this.router.navigate(["../../"]);
  }
}
