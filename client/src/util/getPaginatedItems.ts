import {drop} from 'lodash';

export function getPaginatedItems<T>(
  items: T[],
  page: number,
  itemsPerPage?: number
) {
  const pg = page || 1;
  const pgSize = itemsPerPage || 5;
  const offset = (pg - 1) * pgSize;
  const pagedItems = drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    itemsPerPage: pgSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pgSize),
    data: pagedItems,
  };
}
