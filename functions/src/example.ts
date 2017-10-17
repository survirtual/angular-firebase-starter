import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '~common/authenticated-request';
import { validateFirebaseIdToken } from '~common/validateAuth';

import { ExampleShared } from '~shared/example';

export const submitRating = functions.https
.onRequest((req, res) => {
  validateFirebaseIdToken( req, res, () => {
    const user = (<AuthenticatedRequest>req).user;
  });
});
