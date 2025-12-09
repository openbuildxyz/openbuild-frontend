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

import clsx from 'clsx';

import Image from '../Image';

function Avatar({
  size,
  className,
  src,
  defaultSrc,
  alt,
  user,
}: {
  size: number;
  className?: string;
  src?: string;
  defaultSrc?: string;
  alt?: string;
  user?: { user_handle: string; user_nick_name: string; user_avatar: string };
}) {
  const resolvedAlt = alt || (user && user.user_nick_name) || '';
  const imgClassName = 'rounded-full object-fill';
  const imgProps = {
    width: size,
    height: size,
    src: src || (user && user.user_avatar),
    defaultSrc,
  };

  return user ? (
    <a className={clsx('block', className)} href={`/u/${user.user_handle}`}>
      <Image {...imgProps} className={imgClassName} alt={resolvedAlt} />
    </a>
  ) : (
    <Image {...imgProps} className={clsx(imgClassName, className)} alt={resolvedAlt} />
  );
}

export default Avatar;
