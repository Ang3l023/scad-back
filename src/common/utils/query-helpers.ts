import { SortDirection } from '../dtos/query-param.dto';

export function buildOrder(
  orderBy?: string,
  orderDir?: SortDirection,
): Record<string, any> | undefined {
  if (orderBy) {
    return { [orderBy]: orderDir ?? 'ASC' };
  }
  return undefined;
}
