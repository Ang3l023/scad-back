import { ERoles } from '../enums/role.enum';

export interface IPayloadJwt {
  id: number;
  email: string;
  role: ERoles;
}
