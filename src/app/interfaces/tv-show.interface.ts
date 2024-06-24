export interface TVShow {
  id: number;
  name: string;
  permalink: string;
  start_date: string | null;
  end_date: string | null;
  country: string;
  network: string;
  status: string;
  image_thumbnail_path: string;
}

export interface TVShowsTable {
  page: number;
  pages: number;
  total: string;
  tv_shows: TVShow[];
}
