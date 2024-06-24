import { Component, OnInit } from "@angular/core";
import { TvShowTableComponent } from "../../components/tv-show-table/tv-show-table.component";
import { TVShowService } from "../../services/tv-show.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { TVShow } from "../../interfaces/tv-show.interface";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-search-view",
  standalone: true,
  imports: [TvShowTableComponent, ReactiveFormsModule],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchViewComponent implements OnInit {
  private _tvShowsSubject$ = new BehaviorSubject<TVShow[]>([]);

  filterControl = new FormControl("");

  get tvShows$(): Observable<TVShow[]> {
    return this._tvShowsSubject$.asObservable();
  }

  constructor(private tvShowService: TVShowService) {}

  ngOnInit(): void {
    this._getTVShowsTable();
  }

  onFilterTVShows(): void {
    const query = this.filterControl.value || "";
    this._getTVShowsTable(query);
  }

  private _getTVShowsTable(query: string = "", page: number = 1): void {
    this.tvShowService
      .getTVShows(query, page)
      .pipe(
        tap((data) => {
          const { tv_shows } = data;
          this._tvShowsSubject$.next(tv_shows);
        })
      )
      .subscribe();
  }
}
