/*
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');
const path = require('path');

const { resolveRootPath } = require('../helper');

const apacheLicenseHeader = `/*
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
\n`;

function containsLicenseHeader(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.startsWith('/*') && content.includes('Licensed under the Apache License, Version 2.0');
}

function addLicenseHeader(filePath) {
  if (containsLicenseHeader(filePath)) {
    console.log(`Skipping ${filePath} (already contains Apache 2.0 License Header)`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = apacheLicenseHeader + content;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Added Apache 2.0 License Header to ${filePath}`);
}

function traverseDirectory(directoryPath) {
  if (directoryPath.includes('node_modules')) {
    return;
  }

  const files = fs.readdirSync(directoryPath, { withFileTypes: true });

  files.forEach(file => {
    const filePath = path.join(directoryPath, file.name);

    if (file.isDirectory()) {
      traverseDirectory(filePath);
    } else if (file.isFile() && ['.js', '.css', '.scss'].includes(path.extname(file.name))) {
      addLicenseHeader(filePath);
    }
  });
}

module.exports = {
  execute: (subCmd = 'add', dir = 'src') => {
    if (!subCmd) {
      return;
    }

    traverseDirectory(path.join(resolveRootPath(), dir));
  },
};
