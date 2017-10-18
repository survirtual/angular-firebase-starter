const workboxBuild = require('workbox-build');
const fs = require('fs');
const WB_IMPORT_DIR = 'node_modules/workbox-sw/build/importScripts';
const SRC_DIR = 'src';
const BUILD_DIR = 'dist';
const SW = 'sw.js';
const MF = 'manifest.json'
const globPatterns = [
  '**/*.{js,png,ico,svg,html,css}'
];

const globIgnores = [
  'package.json',
  'index.js',
  'sw.js'
];

const input = {
  swSrc: `${SRC_DIR}/${SW}`,
  swDest: `${BUILD_DIR}/${SW}`,
  globDirectory: BUILD_DIR,
  globPatterns: globPatterns,
  globIgnores: globIgnores,
  maximumFileSizeToCacheInBytes: 4000000
};

workboxBuild.injectManifest(input).then(() => {
  console.log(`The service worker ${BUILD_DIR}/${SW} has been injected with a precache list.`);
  addWorkboxDep();
  addManifest();
});


function addManifest() {
  const msrc = `${SRC_DIR}/${MF}`;
  const mout = `${BUILD_DIR}/${MF}`;
  copyFile(msrc, mout, ()=>{});
}

function addWorkboxDep() {
  //Need to copy service worker dist files on build
  let env = 'dev';
  if (process.argv.length > 2)
    if (process.argv[2] === '--prod' || process.argv[2] === '-p')
      env = 'prod';

  fs.readdir(WB_IMPORT_DIR, (err, files) => {
    files.forEach(file => {
      if (!file.includes(env))
        return;
      copyFile(`${WB_IMPORT_DIR}/${file}`, `${BUILD_DIR}/${file}`, ()=>{});

      if (!file.includes('.map')) {
        let buf = `importScripts('./${file}');`;
        var data = fs.readFileSync(input.swDest);
        var fd = fs.openSync(input.swDest, 'w+');
        fs.write(fd, buf, 0, buf.length, 0);
        fs.writeSync(fd, data, 0, data.length, buf.length); //append old data
        fs.close(fd);
      }

    });
  })
}

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
