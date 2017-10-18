# Angular Firebase PWA Starter

This is a starter for a Firebase PWA using Angular.  It is configured to have the Google Functions written in Typescript and bundled using webpack.

It has a shared folder that can be utilized by both the server and client to easily keep contracts in sync without duplication.

This project uses the [Angular CLI](https://cli.angular.io/).  Check the [CLI repo](https://github.com/angular/angular-cli) for detailed instructions on its use.

Use the [Firebase CLI](https://firebase.google.com/docs/cli/) [Github](https://github.com/firebase/firebase-tools) to get started with Firebase.


## Getting Started

**Clone the repo**

```
git clone https://github.com/survirtual/angular-firebase-starter.git
```

**Initialize firebase**

*Warning: do NOT overwrite package.json when asked.

```
firebase init
```

## PWA

This project uses workbox and a service worker build script (workbox.service-worker.conf.js) to augment missing functionality from workbox.

While all angular CLI commands do work, they will not build nor serve the service worker, so do not use it for builds that get deployed.

**To generate the service worker, use**

```
npm run generate-sw
```

**To create a build with the service worker and manifest, use**

```
// Dev
npm run build

// Prod
npm run build-prod
```

**To create a dev server with live reload and a service worker, use**

```
npm run serve
```

## Firebase Functions

Before deploying functions, make sure to build index.js with webpack.  For convenience, there is an npm script that will build and deploy the functions automatically.

**To build and deploy functions, use**

```
npm run deploy-func
```
*Note this assumes you already logged in to Firebase using
```
firebase login
```
and have selected a project.

