import { Component } from "@angular/core";
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";

@Component({
  selector: "app-favorites-view",
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"],
})
export class FavoritesViewComponent {}
