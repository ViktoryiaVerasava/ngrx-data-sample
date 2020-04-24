import { createSelector } from '@ngrx/store';
import { EntitySelectorsFactory, EntityCollection } from '@ngrx/data';

import { User } from '../models/user.model';

export const selectUserState = new EntitySelectorsFactory().create<User>(
  'User'
);

// sorting
const getSortDirection = (state: EntityCollection<User>) =>
  state['sortDirection'];
const getSortBy = (state: EntityCollection<User>) => state['sortBy'];

export const selectSortDirection = createSelector(
  selectUserState.selectCollection,
  getSortDirection
);
export const selectSortBy = createSelector(
  selectUserState.selectCollection,
  getSortBy
);

export const selectUsersWithSorting = createSelector(
  selectUserState.selectEntities,
  selectSortDirection,
  selectSortBy,
  (users: User[], direction: string, property: string) => {
    if (!direction || !property) {
      return users;
    }
    return users.sort((a, b) => {
      const first = direction === 'ASC' ? a : b;
      const second = direction === 'ASC' ? b : a;
      return first[property].localeCompare(second[property]);
    });
  }
);
