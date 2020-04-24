import { Injectable } from '@angular/core';
import { Logger, EntityCollectionDataService, QueryParams } from '@ngrx/data';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { User } from '../models/user.model';
import { Update } from '@ngrx/entity';

const Users = gql`
  query AllUsers($first: Int!, $orderBy: UserOrderBy) {
    allUsers(first: $first, orderBy: $orderBy) {
      id
      name
    }
  }
`;

@Injectable()
export class UserDataService implements EntityCollectionDataService<User> {
  constructor(logger: Logger, private apollo: Apollo) {
    logger.log('Created custom User EntityDataService');
  }

  readonly name: string;

  getAll(): Observable<User[]> {
    return this.apollo
      .watchQuery<any>({
        query: Users,
        variables: {
          first: 20,
          orderBy: 'createdAt_ASC',
        },
      })
      .valueChanges.pipe(
        delay(3000),
        map(({ data: { allUsers } }) => allUsers),
        map((users) => users.map((user) => this.mapUser(user)))
      ) as Observable<User[]>;
  }

  private mapUser(user: User): User {
    return { ...user, dateLoaded: new Date() };
  }

  // should implement these
  add(user: User): Observable<User> {
    return of();
  }
  delete(id: number | string): Observable<number | string> {
    return of();
  }
  getById(id: any): Observable<User> {
    return of();
  }
  getWithQuery(params: QueryParams | string): Observable<User[]> {
    return of();
  }
  update(update: Update<User>): Observable<User> {
    return of();
  }
  upsert(entity: User): Observable<User> {
    return of();
  }
}
