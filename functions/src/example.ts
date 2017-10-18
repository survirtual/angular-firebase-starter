import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import { Authorization, AuthenticatedRequest } from '~common/auth';

import { ExampleShared } from '~shared/example';

export const exampleFunction = functions.https
.onRequest((req, res) => {
  Authorization.validateFirebaseIdToken( req, res, () => {
    const user = (<AuthenticatedRequest>req).user;
  });
});
