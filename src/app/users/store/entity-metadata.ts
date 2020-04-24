import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  User: {
    filterFn: nameFilter,
    entityDispatcherOptions: { optimisticAdd: true, optimisticUpdate: true },
    additionalCollectionState: {
      sortBy: null,
      sortDirection: null,
    },
  },
};

const pluralNames = { User: 'Users' };

export const entityConfig = {
  entityMetadata,
  pluralNames,
};

export function nameFilter(entities: { name: string }[], search: string) {
  return entities.filter((e) => -1 < e.name.indexOf(search));
}
