import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../store/user.service';
import { CustomFacadeService } from '../../store/custom-facade.service';

@Component({
  selector: 'vv-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  filterName: string;

  constructor(
    private userService: UserService,
    private customFacadeService: CustomFacadeService
  ) {
    // this.users$ = userService.filteredEntities$;
    this.users$ = customFacadeService.users$;
    this.loading$ = userService.loading$;
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getAll();
  }
  applyFilter(name: string): void {
    this.userService.setFilter(name);
  }
  removeFromCache(id: string): void {
    this.userService.removeOneFromCache(id);
  }
  sortUsers(sortBy: string, sortDirection: string) {
    this.customFacadeService.sort(sortBy, sortDirection);
  }

  // not used:
  add(user: User): void {
    this.userService.add(user);
  }
  delete(user: User): void {
    this.userService.delete(user.id);
  }
  update(user: User): void {
    this.userService.update(user);
  }
}
