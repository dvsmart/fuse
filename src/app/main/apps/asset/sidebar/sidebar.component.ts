import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { Subject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'properties-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: any;
  filterBy: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
      private _propertyService: PropertiesService
  )
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      this.filterBy = this._propertyService.filterBy || 'all';

      this._propertyService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.user = user;
          });
  }

  /**
   * On destroy
   */
  ngOnDestroy()
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Change the filter
   *
   * @param filter
   */
  changeFilter(filter): void
  {
      this.filterBy = filter;
      this._propertyService.onFilterChanged.next(this.filterBy);
  }

}
