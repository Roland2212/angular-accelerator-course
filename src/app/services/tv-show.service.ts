import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { TvShow, TvShowBase, TvShowDto, TvShowsTable } from "../interfaces/tv-show.interface";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { FAVORITE_TV_SHOWS_STORAGE_KEY } from "../constants/tv-show.constant";
import { API_URI } from "../constants/api.constant";

@Injectable({
  providedIn: "root",
})
export class TvShowService {
  get favoriteTvShows(): TvShowBase[] {
    return this.storageService.getItemByKey(FAVORITE_TV_SHOWS_STORAGE_KEY) || [];
  }

  constructor(private http: HttpClient, private storageService: StorageService<TvShowBase[]>) {}

  toggleFavorite(tvShow: TvShowBase): void {
    const favorites = this.favoriteTvShows;
    const index = favorites.findIndex((item) => item.id === tvShow.id);
    if (index === -1) favorites.push(tvShow);
    else favorites.splice(index, 1);
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

  getTvShow(query: string): Observable<TvShow> {
    return this.http.get<TvShowDto>(`${API_URI}/show-details?q=${query}`).pipe(
      map((tvShowDto) => {
        return tvShowDto.tvShow;
      })
    );
  }
}
