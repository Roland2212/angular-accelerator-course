import { Component, Input, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  combineLatest,
  finalize,
  of,
  switchMap,
  tap,
} from "rxjs";
import { Table, TableColumn, TableColumnType } from "../../interfaces/generic-table.interface";
import { GenericObject } from "../../interfaces/generic-type.interface";

@Component({
  selector: "app-generic-table",
  templateUrl: "./generic-table.component.html",
  styleUrl: "./generic-table.component.css",
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class GenericTableComponent<T extends GenericObject, U extends Table<T>> implements OnInit, OnDestroy {
  @Input() columns!: TableColumn[];
  @Input() templates!: { [key: string]: TemplateRef<unknown> };
  @Input() data$!: (query: string, page: number) => Observable<U>;
  @Input() filter$!: Observable<string>;
  @Input() refresh$: Observable<boolean> = of(false);

  private _subscriptions$ = new Subscription();
  private _pageSubject$ = new BehaviorSubject<number>(1);

  dataSource: T[] = [];
  pages: number = 0;
  page: number = 0;
  isLoading: boolean = true;

  get page$(): Observable<number> {
    return this._pageSubject$.asObservable();
  }

  get TableColumnType(): typeof TableColumnType {
    return TableColumnType;
  }

  ngOnInit(): void {
    this._getTableData();
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }

  onNextPage(): void {
    if (this.page >= this.pages) return;
    this.page = this.page + 1;
    this._pageSubject$.next(this.page);
  }

  onPreviousPage(): void {
    if (this.page <= 1) return;
    this.page = this.page - 1;
    this._pageSubject$.next(this.page);
  }

  setPage(page: number): void {
    this._pageSubject$.next(page);
  }

  private _getTableData(): void {
    this._subscriptions$.add(
      combineLatest([this.page$, this.filter$, this.refresh$])
        .pipe(
          tap(() => {
            this.isLoading = true;
          }),
          switchMap(([page, filter]) =>
            this.data$(filter, page).pipe(
              tap((tableData) => {
                this.page = page;
                this.pages = tableData.pages;
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
        .subscribe()
    );
  }
}
