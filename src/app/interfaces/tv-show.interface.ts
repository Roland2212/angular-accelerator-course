import { Table } from "./generic-table.interface";

export interface TVShow {
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

export interface TVShowsTable extends Table<TVShow> {
  tv_shows: TVShow[];
}
