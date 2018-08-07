import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';


@Injectable()
export class MessageService {
    onDataListChanged: BehaviorSubject<any>;
    onSelectedDataChanged: BehaviorSubject<any>;
    onSearchTextChanged:BehaviorSubject<any>;
    onFilterChanged:BehaviorSubject<any>;
    data: any[];
    private subject = new Subject<any>();

    apiurl = environment.apiUrl;

    selectedData: string[] = [];
    searchText: string;
    filterBy: string;
    /**
     *
     */
    constructor(private _httpClient: HttpClient) {
        this.apiurl += 'Assetproperties' + '?page=' + 1 + '&pageSize=' + 10;
        this.onDataListChanged = new BehaviorSubject([]);
        this.onSelectedDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject([]);
        this.onFilterChanged = new BehaviorSubject([]);
    }


    sendMessage(action: string, id?: number, message?: string) {
        let payload = new Payload(action, id, message);
        this.subject.next(payload);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    selectMessage(model?:any){
        let payload = new Payload('delete', undefined, undefined,model);
        this.subject.next(payload);
    }

    createMessage(){
        let payload = new Payload('create');
        this.subject.next(payload);
    }

    editMessage(id: number){
        let payload = new Payload('edit',id);
        this.subject.next(payload);
    }

    cancelMessage(){
        let payload = new Payload('cancel');
        this.subject.next(payload);
    }

    refreshMessage(){
        let payload = new Payload('refresh');
        this.subject.next(payload);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getData(),
            ]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getData();
                    });
                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getData();
                    });
                    resolve();
                },
                reject
            );
        });
    }

    getData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get(this.apiurl)
                    .subscribe((response: any) => {
                        this.data = response;
                        this.onDataListChanged.next(this.data);
                        resolve(this.data);
                    }, reject);
            }
        );
    }

}

export class Payload {
    action: string;
    id?: number;
    message?: string;
    extra:any;
    toggle?:boolean

    constructor(action: string, id?: number, message?: string,extra?:any) {
        this.action = action;
        this.id = id;
        this.message = message;
        this.extra = extra;
    }

    IsNew(){
        return this.action === 'create';
    }

    IsEdit(){
        return (this.id != undefined && this.id != null) && this.action === 'edit';
    }

    IsRefresh(){
        return this.action === 'refresh'
    }

    IsDelete(){
        return this.action === 'delete'
    }

    IsCancel(){
        return this.action === 'cancel';
    }
    
}