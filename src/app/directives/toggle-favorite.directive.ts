import { Directive, HostListener, Input } from "@angular/core";
import { TvShowService } from "../services/tv-show.service";

@Directive({
  selector: "[toggleFavorite]",
  standalone: true,
})
export class ToggleFavoriteDirective {
  @Input()
  id!: number;

  @HostListener("click")
  onClick(): void {
    this.tvShowService.toggleFavorite(this.id);
  }

  constructor(private tvShowService: TvShowService) {}
}
