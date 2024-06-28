import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchViewComponent } from "./views/search/search.component";
import { FavoritesViewComponent } from "./views/favorites/favorites.component";
import { tvShowResolver } from "./resolvers/tv-show.resolver";

const routes: Routes = [
  { path: "", component: SearchViewComponent },
  { path: "favorites", component: FavoritesViewComponent },
  {
    path: "details/:id",
    loadComponent: () =>
      import("./components/tv-show-details/tv-show-details.component").then((m) => m.TvShowDetailsComponent),
    resolve: { tvShow: tvShowResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
