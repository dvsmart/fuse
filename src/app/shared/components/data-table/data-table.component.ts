import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { environment } from 'environments/environment';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Subscription, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { GridColumn, ColumnMap } from '../../models/gridColumn';
import { MessageService, Payload } from '../../services/message.service';
import { takeUntil } from 'rxjs/operators';

@Component({

  selector: 'app-datatable',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DatatableComponent implements OnInit {
  @Input() displayedColumns;
  @Input() config;
  dataSource: FilesDataSource | null;
  exampleDatabase: ExampleHttpDao | null;
  //dataSource = new MatTableDataSource();
  expandedElement: any
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  currentPage = 0;
  pageSize = 10;
  allSelected: boolean;
  columnMaps: GridColumn[];
  showAdd: boolean = true;

  private _unsubscribeAll: Subject<any>;
  selectedData: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subscription: Subscription;
  data: any;
  checkboxes: {};
  selection = new SelectionModel<any>(true, [], true);

  constructor(private messageservice: MessageService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.dataSource = new FilesDataSource(this.messageservice);
    this.config = this.config;
    this.setTableColumns();
    this.setColumnsFromConfig();
    this.setColumnsFromDataRow();
    //this.exampleDatabase = new ExampleHttpDao(this.http, this.config.dataUrl);
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.loadData();
    this.messageservice.onDataListChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(results => {
        this.isLoadingResults = false;
        this.data = results.data;
        this.resultsLength = results.totalCount;
        this.checkboxes = {};
        results.data.map(result => {
          this.checkboxes[result.id] = false;
        });
      });
    this.messageservice.onSelectedDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedData => {
        for (const id in this.checkboxes) {
          if (!this.checkboxes.hasOwnProperty(id)) {
            continue;
          }

          this.checkboxes[id] = selectedData.includes(id);
        }
        this.selectedData = selectedData;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  addNew() {
    this.messageservice.createMessage();
  }

  setTableColumns() {
    this.displayedColumns = this.config.columns.map(x => x.primaryKey);
    if (this.config.canExpand && this.displayedColumns != null) {
      this.displayedColumns.unshift('expand');
    }
    if (this.config.canSelect && this.displayedColumns != null) {
      this.displayedColumns.unshift('select');
    }
    if (this.config.canDelete && this.displayedColumns != null) {
      this.displayedColumns.push('delete');
    }
  }

  setColumnsFromConfig() {
    if (this.config.columns != null) {
      this.columnMaps = this.config.columns.map(col => new ColumnMap(col));
    }
  }

  setColumnsFromDataRow() {
    if (this.config.columns == null) {
      this.columnMaps = Object.keys(this.dataSource[0])
        .map(key => {
          return new ColumnMap({
            primaryKey: key,
            header: key.slice(0, 1).toUpperCase() +
              key.replace(/_/g, ' ').slice(1),
            format: 'default',
          });
        });
    }
  }

  loadData() {
    this.isLoadingResults = true;
    merge(this.sort.sortChange, this.paginator.pageIndex)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getDataSource(
            this.sort.active, this.sort.direction, this.currentPage, this.pageSize);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalCount;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.dataSource = data
        if (this.allSelected) {
          //this.dataSource.data.forEach(row => this.selection.select(row));
        }
      });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  onRowSelect(row, $event) {
    $event.stopPropagation();
    this.messageservice.selectMessage(this.selection);
  }

  editRow(row) {
    this.messageservice.editMessage(row.id);
  }

  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.loadData();
  }
}

export class ExampleHttpDao {
  constructor(private http: HttpClient, private url: string) { }
  getDataSource(sort: string, order: string, page: number, pageSize: number): Observable<any> {
    const api = environment.apiUrl;
    page = page == 0 ? 1 : page;
    const requestUrl = api + this.url + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<any>(requestUrl);
  }
}

export class FilesDataSource extends DataSource<any>
{
  constructor(private _messageService: MessageService) {
    super();
  }

  connect(): Observable<any[]> {
    return this._messageService.onDataListChanged;
  }

  disconnect(): void { }
}