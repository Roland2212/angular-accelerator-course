import { Component, OnInit } from "@angular/core";
import { TvShowService } from "../../services/tv-show.service";
import { Observable, ReplaySubject } from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { TvShowsTable } from "../../interfaces/tv-show.interface";
import { TV_SHOWS_TABLE_COLUMNS } from "./search.config";
import { IsFavoritePipe } from "../../pipe/is-favorite.pipe";
import { Router } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { ToggleFavoriteDirective } from "../../components/directives/toggle-favorite.directive";

@Component({
  selector: "app-search-view",
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css",
  standalone: true,
  imports: [ReactiveFormsModule, GenericTableComponent, IsFavoritePipe, AsyncPipe, ToggleFavoriteDirective],
})
export class SearchViewComponent implements OnInit {
  private _filterSubject$ = new ReplaySubject<string>();

  tableColumns = TV_SHOWS_TABLE_COLUMNS;

  filterControl = new FormControl<string>("");

  get tvShowsTable$(): (query: string, page: number) => Observable<TvShowsTable> {
    return (query: string, page: number) => this.tvShowService.getTvShowsTable(query, page);
  }

  get filter$(): Observable<string> {
    return this._filterSubject$.asObservable();
  }

  get favoriteTvShowsIds$(): Observable<number[]> {
    return this.tvShowService.favoriteTvShowsIds$;
  }

  constructor(private tvShowService: TvShowService, private router: Router) {}

  ngOnInit(): void {
    this.onSearchTVShows();
  }

  onSearchTVShows(): void {
    const filter = this.filterControl.value || "";
    this._filterSubject$.next(filter);
  }

  onNavigateToDetails(tvShowId: number): void {
    this.router.navigate(["details", tvShowId]);
  }
}
