import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { TvShow } from "../interfaces/tv-show.interface";
import { inject } from "@angular/core";
import { TvShowService } from "../services/tv-show.service";
import { Observable, of } from "rxjs";

export const tvShowResolver: ResolveFn<TvShow> = (route: ActivatedRouteSnapshot): Observable<TvShow> => {
  const tvShowService = inject(TvShowService);
  const id = +route.paramMap.get("id")!;
  if (tvShowService.favoriteTvShows[id]) return of(tvShowService.favoriteTvShows[id]);
  return tvShowService.getTvShow(id);
};
