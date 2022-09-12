import { Schema } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type TUserSession = {
  _id: Schema.Types.ObjectId;
};

export interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

export interface SchemaError extends Error {
  code?: number;
}

export interface ApplicationError extends Error {
  statusCode?: number;
}
