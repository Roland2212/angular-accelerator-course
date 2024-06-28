import { Component, OnInit } from "@angular/core";
import { TvShowService } from "../../services/tv-show.service";
import { Observable, ReplaySubject } from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { TvShowBase, TvShowsTable } from "../../interfaces/tv-show.interface";
import { TV_SHOWS_TABLE_COLUMNS } from "./search.config";
import { FavoritePipe } from "../../pipe/favorite.pipe";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-view",
  standalone: true,
  imports: [ReactiveFormsModule, GenericTableComponent, FavoritePipe],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css",
})
export class SearchViewComponent implements OnInit {
  private _filter$ = new ReplaySubject<string>();

  tableColumns = TV_SHOWS_TABLE_COLUMNS;

  filterControl = new FormControl<string>("");

  get tvShowsTable$(): (query: string, page: number) => Observable<TvShowsTable> {
    return (query: string, page: number) => this.tvShowService.getTvShowsTable(query, page);
  }

  get filter$(): Observable<string> {
    return this._filter$.asObservable();
  }

  get favoriteTvShows(): TvShowBase[] {
    return this.tvShowService.favoriteTvShows;
  }

  constructor(private tvShowService: TvShowService, private router: Router) {}

  ngOnInit(): void {
    this.onSearchTVShows();
  }

  onSearchTVShows(): void {
    const filter = this.filterControl.value || "";
    this._filter$.next(filter);
  }

  onToggleFavorites(tvShow: TvShowBase): void {
    this.tvShowService.toggleFavorite(tvShow);
  }

  onNavigateToDetails(tvShow: TvShowBase): void {
    this.router.navigate(["details", tvShow.id]);
  }
}
