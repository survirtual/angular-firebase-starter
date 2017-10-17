const admin = require('firebase-admin');

export const validateFirebaseIdToken = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Headers', 'authorization, content-type');
      res.status(200).send();
      return;
    }

    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      (!req.cookies || req.cookies && !req.cookies.__session)) {
      console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
          'Make sure you authorize your request by providing the following HTTP header:',
          'Authorization: Bearer <Firebase ID Token>',
          'or by passing a "__session" cookie.');
      res.status(403).send('Unauthorized');
      return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      console.log('Found "Authorization" header');
      // Read the ID Token from the Authorization header.
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      console.log('Found "__session" cookie');
      // Read the ID Token from cookie.
      idToken = req.cookies.__session;
    }
    admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      req.user = decodedIdToken;
      next();
    }).catch(error => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    });
};
