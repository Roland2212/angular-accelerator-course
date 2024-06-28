import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BehaviorSubject, Observable, catchError, combineLatest, finalize, of, switchMap, tap } from "rxjs";
import { Table, TableColumn, TableColumnType } from "../../interfaces/generic-table.interface";
import { GenericObject } from "../../interfaces/generic-type.interface";

@Component({
  selector: "app-generic-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./generic-table.component.html",
  styleUrl: "./generic-table.component.css",
})
export class GenericTableComponent<T extends GenericObject, U extends Table<T>> implements OnInit {
  @Input() columns!: TableColumn[];
  @Input() templates!: { [key: string]: TemplateRef<unknown> };
  @Input() data$!: (query: string, page: number) => Observable<U>;
  @Input() filter$!: Observable<string>;
  @Input() refresh$: Observable<boolean> = of(false);

  private _pageSubject$ = new BehaviorSubject<number>(1);

  dataSource: T[] = [];
  isLoading: boolean = true;

  get page$(): Observable<number> {
    return this._pageSubject$.asObservable();
  }

  get TableColumnType(): typeof TableColumnType {
    return TableColumnType;
  }

  constructor() {}

  ngOnInit(): void {
    this._getTableData();
  }

  setPage(page: number): void {
    this._pageSubject$.next(page);
  }

  private _getTableData(): void {
    combineLatest([this.page$, this.filter$, this.refresh$])
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(([page, filter]) =>
          this.data$(filter, page).pipe(
            tap((tableData) => {
              this.dataSource = tableData.data;
            }),
            catchError((error) => {
              return error;
            }),
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe();
  }
}
