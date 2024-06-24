import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchViewComponent } from "./views/search/search.component";
import { FavoritesViewComponent } from "./views/favorites/favorites.component";

const routes: Routes = [
  { path: "", component: SearchViewComponent },
  { path: "favorites", component: FavoritesViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
