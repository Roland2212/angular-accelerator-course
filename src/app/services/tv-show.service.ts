import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { TVShow, TVShowsTable } from "../interfaces/tv-show.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TVShowService {
  constructor(private http: HttpClient) {}

  getTVShowsTable(query: string, page: number): Observable<TVShowsTable> {
    return this.http.get<TVShowsTable>(`https://www.episodate.com/api/search?q=${query}&page=${page}`).pipe(
      map((tableData) => {
        return {
          ...tableData,
          data: tableData.tv_shows,
        };
      })
    );
  }
}
