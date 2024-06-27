import { TableColumnType, TableColumn } from "../../interfaces/generic-table.interface";

export const TV_SHOWS_TABLE_COLUMNS: TableColumn[] = [
  { type: TableColumnType.DEFAULT, label: "Name", key: "name" },
  { type: TableColumnType.DEFAULT, label: "Country", key: "country" },
  { type: TableColumnType.DEFAULT, label: "Year Started", key: "start_date" },
  { type: TableColumnType.DEFAULT, label: "Status", key: "status" },
  { type: TableColumnType.TEMPLATE, label: "Actions", key: "actions" },
];
