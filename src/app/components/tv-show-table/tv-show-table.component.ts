import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { TVShow } from "../../interfaces/tv-show.interface";

@Component({
  selector: "app-tv-show-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tv-show-table.component.html",
  styleUrls: ["./tv-show-table.component.css"],
})
export class TvShowTableComponent {
  @Input() tvShows$!: Observable<TVShow[]>;

  isLoading: boolean = false;
  tvShows: TVShow[] = [];
}
