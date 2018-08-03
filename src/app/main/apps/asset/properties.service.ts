import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from '../../../../../node_modules/rxjs';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { FuseUtils } from '@fuse/utils';
import { CreateAssetPropertyRequest } from './models/createPropertyRequestModel';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
    onPropertyChanged: BehaviorSubject<any>;
    onSelectedPropertiesChanged: BehaviorSubject<any>;
    onPropertyDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    properties: CreateAssetPropertyRequest[];
    user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onPropertyChanged = new BehaviorSubject([]);
        this.onSelectedPropertiesChanged = new BehaviorSubject([]);
        this.onPropertyDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProperties(),
                //this.getUserData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getProperties();
                    });

                    // this.onFilterChanged.subscribe(filter => {
                    //     this.filterBy = filter;
                    //     this.getContacts();
                    // });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getProperties(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/contacts-contacts')
                    .subscribe((response: any) => {

                        this.properties = response;

                        // if ( this.filterBy === 'starred' )
                        // {
                        //     this.properties = this.properties.filter(_property => {
                        //         return this.user.starred.includes(_property.AssetId);
                        //     });
                        // }

                        // if ( this.filterBy === 'frequent' )
                        // {
                        //     this.properties = this.properties.filter(_property => {
                        //         return this.user.frequentContacts.includes(_contact.id);
                        //     });
                        // }

                        // if ( this.searchText && this.searchText !== '' )
                        // {
                        //     this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                        // }

                        // this.contacts = this.contacts.map(contact => {
                        //     return new CreateAssetPropertyRequest(contact);
                        // });

                        this.onPropertyChanged.next(this.properties);
                        resolve(this.properties);
                    }, reject);
            }
        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                    .subscribe((response: any) => {
                        this.user = response;
                        this.o.next(this.user);
                        resolve(this.user);
                    }, reject);
            }
        );
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedContact(id): void
    {
        // First, check if we already have that contact as selected...
        if ( this.selectedContacts.length > 0 )
        {
            const index = this.selectedContacts.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContacts.push(id);

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedContacts.length > 0 )
        {
            this.deselectContacts();
        }
        else
        {
            this.selectContacts();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void
    {
        this.selectedContacts = [];

        // If there is no filter, select all contacts
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedContacts = [];
            this.properties.map(contact => {
                this.selectedContacts.push(contact.AssetId.toString());
            });
        }

        // Trigger the next event
        this.onSelectedPropertiesChanged.next(this.selectedContacts);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/contacts-contacts/' + contact.id, {...contact})
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, {...userData})
                .subscribe(response => {
                    this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect contacts
     */
    deselectContacts(): void
    {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void
    {
        const contactIndex = this.contacts.indexOf(contact);
        this.contacts.splice(contactIndex, 1);
        this.onContactsChanged.next(this.contacts);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void
    {
        for ( const contactId of this.selectedContacts )
        {
            const contact = this.contacts.find(_contact => {
                return _contact.id === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }

}
