import { Table } from "./generic-table.interface";

export interface TvShow {
  id: number;
  name: string;
  permalink: string;
  start_date: string | null;
  end_date: string | null;
  country: string;
  network: string;
  status: Status;
  image_thumbnail_path: string;
}

export type Status = "Ended" | "Canceled/Ended" | "Running" | "New Series" | "In Development" | "To Be Determined";

export interface TvShowsTable extends Table<TvShow> {
  tv_shows: TvShow[];
}
