import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { User } from '../models/user.model';
import { CustomReducerService } from './custom-reducer.service';

@Injectable({ providedIn: 'root' })
export class UserService extends EntityCollectionServiceBase<User> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    customReducerService: CustomReducerService
  ) {
    super('User', serviceElementsFactory);
    customReducerService.register();
  }
}
