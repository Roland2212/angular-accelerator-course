import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { TvShow, TvShowsTable } from "../interfaces/tv-show.interface";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { FAVORITE_TV_SHOWS_STORAGE_KEY } from "../constants/tv-show.constant";

@Injectable({
  providedIn: "root",
})
export class TVShowService {
  get favoriteTvShows(): TvShow[] {
    return this.storageService.getItemByKey(FAVORITE_TV_SHOWS_STORAGE_KEY) || [];
  }

  constructor(private http: HttpClient, private storageService: StorageService<TvShow[]>) {}

  toggleFavorite(tvShow: TvShow): void {
    const favorites = this.storageService.getItemByKey(FAVORITE_TV_SHOWS_STORAGE_KEY) || [];
    const index = favorites.findIndex((item) => item.id === tvShow.id);
    if (index === -1) favorites.push(tvShow);
    else favorites.splice(index, 1);
    this.storageService.setItemByKey(FAVORITE_TV_SHOWS_STORAGE_KEY, favorites);
  }

  getTVShowsTable(query: string, page: number): Observable<TvShowsTable> {
    return this.http.get<TvShowsTable>(`https://www.episodate.com/api/search?q=${query}&page=${page}`).pipe(
      map((tableData) => {
        return {
          ...tableData,
          data: tableData.tv_shows,
        };
      })
    );
  }
}
