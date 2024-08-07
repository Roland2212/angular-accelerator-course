import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, forkJoin, map, of, switchMap } from "rxjs";
import { TvShow, TvShowDto, TvShowsTable } from "../interfaces/tv-show.interface";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { FAVORITE_TV_SHOWS_STORAGE_KEY, TV_SHOW_STATUSES_ORDER } from "../constants/tv-show.constant";
import { API_URI } from "../constants/api.constant";
import { NumberKeyValue } from "../interfaces/generic-type.interface";
import { compareDesc } from "date-fns";

@Injectable({
  providedIn: "root",
})
export class TvShowService {
  private _favoriteTvShowsIdsSubject$ = new BehaviorSubject<number[]>(
    this.storageService.getItemByKey(FAVORITE_TV_SHOWS_STORAGE_KEY)
  );
  private _favoriteTvShows: NumberKeyValue<TvShow> = {};

  get favoriteTvShowsIds$(): Observable<number[]> {
    return this._favoriteTvShowsIdsSubject$.asObservable();
  }

  get favoriteTvShows(): NumberKeyValue<TvShow> {
    return this._favoriteTvShows;
  }

  constructor(private http: HttpClient, private storageService: StorageService<number[]>) {}

  setFavoriteTvShows(tvShow: TvShow): void {
    this._favoriteTvShows[tvShow.id] = tvShow;
  }

  toggleFavorite(tvShowId: number): void {
    const favorites = this._favoriteTvShowsIdsSubject$.getValue();
    const index = favorites.findIndex((id) => id === tvShowId);
    if (index === -1) favorites.push(tvShowId);
    else favorites.splice(index, 1);
    this._favoriteTvShowsIdsSubject$.next(favorites);
    this.storageService.setItemByKey(FAVORITE_TV_SHOWS_STORAGE_KEY, favorites);
  }

  getTvShowsTable(query: string, page: number): Observable<TvShowsTable> {
    let apiUrl: string;
    apiUrl = query ? `${API_URI}/search?q=${query}&page=${page}` : `${API_URI}/most-popular?page=${page}`;
    return this.http.get<TvShowsTable>(apiUrl).pipe(
      map((tableData) => {
        return {
          ...tableData,
          data: tableData.tv_shows,
        };
      })
    );
  }

  getTvShow(query: number): Observable<TvShow> {
    return this.http.get<TvShowDto>(`${API_URI}/show-details?q=${query}`).pipe(
      map(({ tvShow }) => {
        this.setFavoriteTvShows(tvShow);
        return tvShow;
      })
    );
  }

  getFavoritesTvShows(): Observable<TvShow[]> {
    return this.favoriteTvShowsIds$.pipe().pipe(
      map((ids) => this._mapIdsIntoFavoriteTvShowsRequests(ids)),
      switchMap((tvShows$) =>
        forkJoin(tvShows$).pipe(
          map((shows) => {
            return this._sortTvShows(shows);
          })
        )
      )
    );
  }

  private _mapIdsIntoFavoriteTvShowsRequests(ids: number[]): Observable<TvShow>[] {
    if (!ids.length) return [];
    return ids.map((id) => {
      if (this.favoriteTvShows[id]) return of(this.favoriteTvShows[id]);
      return this.getTvShow(id);
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
    return compareDesc(a.countdown?.air_date || "", b.countdown?.air_date || "");
  }

  private _sortByStatusFn(a: TvShow, b: TvShow): number {
    return TV_SHOW_STATUSES_ORDER.indexOf(b.status) - TV_SHOW_STATUSES_ORDER.indexOf(a.status);
  }
}
