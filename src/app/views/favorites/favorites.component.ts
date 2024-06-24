import { Component } from "@angular/core";
import { TvShowTableComponent } from "../../components/tv-show-table/tv-show-table.component";

@Component({
  selector: "app-favorites-view",
  standalone: true,
  imports: [TvShowTableComponent],
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"],
})
export class FavoritesViewComponent {}
