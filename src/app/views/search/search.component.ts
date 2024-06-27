import { Component, OnInit } from "@angular/core";
import { TVShowService } from "../../services/tv-show.service";
import { Observable, ReplaySubject } from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { TVShowsTable } from "../../interfaces/tv-show.interface";
import { TV_SHOWS_TABLE_COLUMNS } from "./search.config";

@Component({
  selector: "app-search-view",
  standalone: true,
  imports: [GenericTableComponent, ReactiveFormsModule],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchViewComponent implements OnInit {
  private _filter$ = new ReplaySubject<string>();

  tableColumns = TV_SHOWS_TABLE_COLUMNS;

  filterControl = new FormControl<string>("");

  get tvShowsTable$(): (query: string, page: number) => Observable<TVShowsTable> {
    return (query: string, page: number) => this.tvShowService.getTVShowsTable(query, page);
  }

  get filter$(): Observable<string> {
    return this._filter$.asObservable();
  }

  constructor(private tvShowService: TVShowService) {}

  ngOnInit(): void {
    this.onSearchTVShows();
  }

  onSearchTVShows(): void {
    const filter = this.filterControl.value || "";
    this._filter$.next(filter);
  }
}
