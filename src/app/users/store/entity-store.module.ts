import {
  EntityDataService,
  EntityDataModule,
  DefaultDataServiceConfig,
} from '@ngrx/data';

import { UserDataService } from './user-data.service';
import { NgModule } from '@angular/core';
import { entityConfig } from './entity-metadata';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'api', // default root path to the server's web api

  // Optionally specify resource URLS for HTTP calls
  entityHttpResourceUrls: {
    // Case matters. Match the case of the entity name.
    User: {
      // You must specify the root as part of the resource URL.
      entityResourceUrl: 'api/user/',
      collectionResourceUrl: 'api/users/',
    },
  },

  timeout: 3000, // request timeout

  // Simulate latency for demo
  getDelay: 500,
  saveDelay: 800,
};

@NgModule({
  imports: [EntityDataModule.forRoot(entityConfig)],
  providers: [
    UserDataService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    userDataService: UserDataService
  ) {
    entityDataService.registerService('User', userDataService); // <-- register it
  }
}
