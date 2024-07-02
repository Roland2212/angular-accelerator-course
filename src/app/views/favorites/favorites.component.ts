import { Component, OnDestroy, OnInit } from "@angular/core";
import { TvShowService } from "../../services/tv-show.service";
import { CommonModule } from "@angular/common";
import { Observable, Subscription, finalize, forkJoin, map, of, switchMap, tap } from "rxjs";
import { TvShow } from "../../interfaces/tv-show.interface";
import { IsFavoritePipe } from "src/app/pipe/is-favorite.pipe";
import { Router } from "@angular/router";
import { TV_SHOW_STATUSES } from "../../constants/tv-show.constant";

@Component({
  selector: "app-favorites-view",
  standalone: true,
  imports: [CommonModule, IsFavoritePipe],
  templateUrl: "./favorites.component.html",
  styleUrl: "./favorites.component.css",
})
export class FavoritesViewComponent implements OnInit, OnDestroy {
  private _subscriptions$ = new Subscription();

  tvShows: TvShow[] = [];
  isLoading: boolean = true;

  get favoriteTvShowsIds$(): Observable<number[]> {
    return this.tvShowService.favoriteTvShowsIds$;
  }

  constructor(private tvShowService: TvShowService, private router: Router) {}

  ngOnInit(): void {
    this._getFavoriteTvShows();
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }

  trackById(index: number, tvShow: TvShow): number {
    return tvShow.id;
  }

  onNavigateToDetails(tvShowId: number): void {
    this.router.navigate(["details", tvShowId]);
  }

  onToggleFavorites(tvShowId: number): void {
    this.tvShowService.toggleFavorite(tvShowId);
  }

  private _getFavoriteTvShows(): void {
    this._subscriptions$.add(
      this.tvShowService.favoriteTvShowsIds$
        .pipe(
          tap(() => {
            this.isLoading = true;
          }),
          map((ids) => this._mapIdsIntoFavoriteTvShowsRequests(ids)),
          switchMap((favoriteTvShows$) =>
            forkJoin(favoriteTvShows$).pipe(
              tap((tvShows) => {
                this.tvShows = this._sortTvShows(tvShows);
              }),
              finalize(() => {
                this.isLoading = false;
              })
            )
          )
        )
        .subscribe()
    );
  }

  private _mapIdsIntoFavoriteTvShowsRequests(ids: number[]): Observable<TvShow>[] {
    if (!ids.length) this.tvShows = [];
    const favoriteTvShows = this.tvShowService.favoriteTvShows;
    return ids.map((id) => {
      if (favoriteTvShows[id]) return of(favoriteTvShows[id]);
      return this.tvShowService.getTvShow(id);
    });
  }

  private _sortTvShows(tvShows: TvShow[]): TvShow[] {
    const sortedByDate = tvShows
      .filter((tvShow) => tvShow.countdown?.air_date)
      .sort((a, b) => this._sortByReleaseDateFn(a, b));
    const sortedByStatus = tvShows
      .filter((tvShow) => !tvShow.countdown?.air_date)
      .sort((a, b) => this._sortByStatusFn(a, b));
    return [...sortedByDate, ...sortedByStatus];
  }

  private _sortByReleaseDateFn(a: TvShow, b: TvShow): number {
    return Date.parse(a.countdown?.air_date || "0") - Date.parse(b.countdown?.air_date || "0");
  }

  private _sortByStatusFn(a: TvShow, b: TvShow): number {
    return TV_SHOW_STATUSES.indexOf(b.status) - TV_SHOW_STATUSES.indexOf(a.status);
  }
}
