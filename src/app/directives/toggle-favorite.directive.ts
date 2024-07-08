import { Directive, HostBinding, HostListener, Input } from "@angular/core";
import { TvShowService } from "../services/tv-show.service";

@Directive({
  selector: "[toggleFavorite]",
  standalone: true,
})
export class ToggleFavoriteDirective {
  @Input({ alias: "toggleFavorite" })
  id!: number;

  @HostListener("click")
  toggleFavorite(): void {
    this.tvShowService.toggleFavorite(this.id);
  }

  constructor(private tvShowService: TvShowService) {}
}
