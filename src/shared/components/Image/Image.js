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

import NextImage from 'next/image';

import { useAssetUrl } from '#/state/application/hooks';

function Image({ width, height, src, alt = '', defaultSrc, className, ...rest }) {
  const resolvedSrc = useAssetUrl(src) || defaultSrc;

  return resolvedSrc && (
    <NextImage
      {...rest}
      className={className}
      width={width}
      height={height}
      src={resolvedSrc}
      alt={alt}
    />
  );
}

export default Image;
