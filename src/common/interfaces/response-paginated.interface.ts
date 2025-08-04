export interface IReponsePaginated<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
}
