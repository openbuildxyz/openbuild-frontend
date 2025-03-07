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

import Image from '@/components/Image';

import { useUser } from '#/state/application/hooks';

import ImageUpload from './ImageUpload';

function Banner({ data, onUpload }) {
  const user = useUser();

  return (
    <div className="relative">
      <div className="h-[160px] md:h-[200px]">
        <Image
          width={1920}
          height={200}
          className="w-full h-full object-cover"
          src={data.base.user_background_image}
          defaultSrc="/images/profile-banner.png"
          alt=""
        />
      </div>
      {data?.base.user_id === user?.base.user_id && (
        <ImageUpload onSuccess={onUpload} />
      )}
    </div>
  );
}

export default Banner;
