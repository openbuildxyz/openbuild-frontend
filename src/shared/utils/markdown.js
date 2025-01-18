/**
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

import TurndownService from 'turndown';
import { getProcessor } from 'bytemd';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import breaks from '@bytemd/plugin-breaks';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import gemoji from '@bytemd/plugin-gemoji';

const plugins = [gfm(), breaks(), highlight(), math(), mermaid(), gemoji()];

function getPlugins() {
  return plugins.slice();
}

function sanitize(sch) {
  const allowedMap = {
    iframe: ['src', 'width', 'height', 'title', 'frameBorder', 'allow', 'allowFullScreen'],
    video: ['autoPlay', 'controls', 'controlsList'],
    source: ['src', 'type'],
  };

  sch.attributes = {
    ...sch.attributes,
    ...allowedMap,
  };
  sch.tagNames = sch.tagNames ? [...sch.tagNames, ...Object.keys(allowedMap)] : sch.tagNames;

  return sch;
}

function renderMarkdown(htmlContent) {
  return new TurndownService().turndown(htmlContent);
}

function renderHtml(markdownContent) {
  return getProcessor({ sanitize, plugins }).processSync(markdownContent).toString();
}

export { getPlugins, sanitize, renderMarkdown, renderHtml };
