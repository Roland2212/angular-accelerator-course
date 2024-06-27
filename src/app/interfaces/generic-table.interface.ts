export interface Table<T> {
  page: number;
  pages: number;
  total: string;
  data: T[];
}

export enum TableColumnType {
  DEFAULT = "default",
  DATE = "date",
  TEMPLATE = "template",
}

export interface TableColumn {
  label: string;
  key: string;
  type: TableColumnType.DEFAULT | TableColumnType.DATE | TableColumnType.TEMPLATE;
  format?: string;
}
