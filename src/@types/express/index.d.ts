import { IPayloadJwt } from '../../common/interfaces/payload-jwt.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IPayloadJwt;
    }
  }
}
