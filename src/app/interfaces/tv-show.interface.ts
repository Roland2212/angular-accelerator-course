import { Table } from "./generic-table.interface";

export interface TvShowBase {
  id: number;
  name: string;
  permalink: string;
  start_date: string;
  end_date: string;
  country: string;
  network: string;
  status: TvShowStatusT;
  image_thumbnail_path: string;
}

export type TvShowStatusT =
  | "Ended"
  | "Canceled/Ended"
  | "Running"
  | "New Series"
  | "In Development"
  | "To Be Determined";

export enum TvShowStatusE {
  ENDED = "Ended",
  CANCELED_ENDED = "Canceled/Ended",
  RUNNING = "Running",
  NEW_SERIES = "New Series",
  IN_DEVELOPMENT = "In Development",
  TO_BE_DETERMINED = "To Be Determined",
}

export interface TvShowsTable extends Table<TvShowBase> {
  tv_shows: TvShowBase[];
}

export interface TvShowDto {
  tvShow: TvShow;
}

export interface TvShow extends TvShowBase {
  url: string;
  description: string;
  description_source: string;
  runtime: number;
  youtube_link: string;
  image_path: string;
  rating: number;
  rating_count: string;
  countdown: Episode | null;
  genres: string[];
  pictures: string[];
  episodes: Episode[];
}

export interface Episode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}
