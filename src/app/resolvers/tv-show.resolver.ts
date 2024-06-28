import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TvShow } from "../interfaces/tv-show.interface";
import { inject } from "@angular/core";
import { TvShowService } from "../services/tv-show.service";

export const tvShowResolver: ResolveFn<TvShow> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tvShowService = inject(TvShowService);
  const id = route.paramMap.get("id") || "";
  return tvShowService.getTvShow(id);
};
