import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { TvShow, TvShowDto, TvShowsTable } from "../interfaces/tv-show.interface";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { FAVORITE_TV_SHOWS_STORAGE_KEY } from "../constants/tv-show.constant";
import { API_URI } from "../constants/api.constant";

@Injectable({
  providedIn: "root",
})
export class TvShowService {
  private _favoriteTvShowsIdsSubject$ = new BehaviorSubject<number[]>(
    this.storageService.getItemByKey(FAVORITE_TV_SHOWS_STORAGE_KEY)
  );
  private _favoriteTvShows: { [key: number]: TvShow } = {};

  get favoriteTvShowsIds$(): Observable<number[]> {
    return this._favoriteTvShowsIdsSubject$.asObservable();
  }

  get favoriteTvShows(): { [key: number]: TvShow } {
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
    return this.http.get<TvShowsTable>(`${API_URI}/search?q=${query}&page=${page}`).pipe(
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
}
