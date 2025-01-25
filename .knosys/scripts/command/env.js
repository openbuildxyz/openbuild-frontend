const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { resolveRootPath } = require('../helper');

module.exports = {
  execute: () => {
    const packageJsonPath = path.join(resolveRootPath(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const requiredNodeVersion = packageJson?.engines?.node;
    const currentNodeVersion = process.version;
    
    if (!requiredNodeVersion) {
      console.error('No engines.node configuration found in package.json');
      process.exit(1);
    }

    if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
      console.error(`\nCurrent Node.js version ${currentNodeVersion} does not meet requirements!`);
      console.error(`Please use Node.js version ${requiredNodeVersion}\n`);
      process.exit(1);
    }
  },
};