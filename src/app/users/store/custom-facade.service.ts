import { Injectable } from '@angular/core';
import { EntityOp, EntityActionFactory } from '@ngrx/data';
import { User } from '../models/user.model';
import { Store, select } from '@ngrx/store';
import { selectUsersWithSorting } from './custom-selectors';

@Injectable({ providedIn: 'root' })
export class CustomFacadeService {
  constructor(
    private store: Store,
    private entityActionFactory: EntityActionFactory
  ) {}

  users$ = this.store.pipe(select(selectUsersWithSorting));

  sort(sortBy: string, sortDirection: string): void {
    const action = this.entityActionFactory.create<User>(
      'User',
      '@ngrx/data/sort' as EntityOp,
      (<unknown>{
        sortBy,
        sortDirection,
      }) as User,
      { tag: 'Users Sort' }
    );

    this.store.dispatch(action);
  }
}
