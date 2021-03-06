const { productName } = require('./package.json');

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  productName,
  appId: 'wang.baran.pia-player',
  asar: true,
  files: ['**/dist/**'],
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32'],
      },
    ],
    verifyUpdateCodeSignature: false,
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowToChangeInstallationDirectory: true,
    uninstallDisplayName: productName,
  },
  mac: {
    target: [
      {
        target: 'dmg',
        arch: ['x64'],
      },
      {
        target: 'zip',
        arch: ['x64'],
      },
    ],
  },
  dmg: {
    background: 'build/dmg-background.png',
    contents: [
      {
        x: 200,
        y: 320,
      },
      {
        x: 440,
        y: 320,
        type: 'link',
        path: '/Applications',
      },
    ],
    window: {
      width: 640,
      height: 480,
    },
  },
  publish: [
    {
      provider: 'github',
      releaseType: 'release',
      publishAutoUpdate: true,
    },
  ],
};

module.exports = config;
