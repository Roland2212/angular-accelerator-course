import { DatePipe, DecimalPipe, I18nPluralPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { TvShow } from "../../interfaces/tv-show.interface";
import { CountSeasonsPipe } from "../../pipe/count-seasons.pipe";

@Component({
  selector: "app-tv-show-details",
  templateUrl: "./tv-show-details.component.html",
  styleUrl: "./tv-show-details.component.css",
  standalone: true,
  imports: [DatePipe, DecimalPipe, I18nPluralPipe, CountSeasonsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowDetailsComponent {
  @Input() tvShow!: TvShow;

  constructor(private router: Router) {}

  onNavigateBack(): void {
    this.router.navigate(["../../"]);
  }
}
