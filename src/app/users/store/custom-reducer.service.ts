import { Injectable } from '@angular/core';
import {
  EntityCollection,
  EntityCollectionReducerRegistry,
  EntityAction,
  EntityOp,
  EntityCollectionReducer,
} from '@ngrx/data';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class CustomReducerService {
  constructor(
    private entityCollectionReducerRegistry: EntityCollectionReducerRegistry
  ) {}

  register() {
    const reducer: EntityCollectionReducer = this.entityCollectionReducerRegistry.getOrCreateReducer(
      'User'
    );

    this.entityCollectionReducerRegistry.registerReducer(
      'User',
      (
        collection: EntityCollection<User>,
        action: EntityAction
      ): EntityCollection<User> => {
        switch (action.payload.entityOp) {
          case '@ngrx/data/sort' as EntityOp: {
            return {
              ...collection,
              loaded: true,
              loading: false,
              changeState: {},
              sortBy: action.payload.data.sortBy,
              sortDirection: action.payload.data.sortDirection,
            } as EntityCollection<User>;
          }
        }

        return reducer(collection, action);
      }
    );
  }
}
