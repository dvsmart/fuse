import { GridColumn } from "./gridColumn";

export class TableConfig {
  caption?: string;
  columns: GridColumn[];
  canExpand?: boolean = false;
  canSort?: boolean = true;
  canSelect?: boolean = false;
  canDelete?: boolean = true;
  detailComponent?: any;
  pageSize: number;
  dataUrl?: string;
  deleteUrl?: string;
  enableAdd?: boolean = true;

  constructor(caption: string, pageSize: number, canExpand?: boolean, multiSelect?: boolean, canDelete?: boolean) {
    this.caption = caption;
    this.canExpand = canExpand;
    this.canSelect = multiSelect;
    this.canDelete = canDelete;
    this.pageSize = pageSize;
  }
}
