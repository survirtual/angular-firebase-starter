import { Request } from 'express';

export class User  {
  public name: string;
  public ppicture: string;
  public aud: string;
  public auth_time: number;
  public user_id: string;
  public sub: string;
  public iat: number;
  public exp: number;
  public email: string;
  public email_verified: boolean;
  public uid: string;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}
