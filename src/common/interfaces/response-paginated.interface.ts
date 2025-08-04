export interface IReponsePaginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
