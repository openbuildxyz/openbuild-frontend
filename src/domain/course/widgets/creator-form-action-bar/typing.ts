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

import type { DataValue, EntityId, ResponseResult } from '@/types';
import type { ClassValue } from 'clsx';

type BaseProps = {
  className?: ClassValue;
};

type HttpRequestAction = (...args: DataValue[]) => Promise<ResponseResult>;

type SaveActionProps = BaseProps & {
  entity?: Record<string, DataValue>;
  updateAction: HttpRequestAction;
};

type PreviewActionProps = BaseProps & {
  entityUrl: string;
};

type PublishActionProps = BaseProps & {
  entityId: EntityId;
  collectionUrl: string;
  updateAction: HttpRequestAction;
};

type CreatorFormActionBarProps =
  BaseProps &
  Pick<SaveActionProps, 'entity'> &
  Pick<PreviewActionProps, 'entityUrl'> &
  Pick<PublishActionProps, 'entityId' | 'collectionUrl'> &
  {
    actions: {
      updateAction: SaveActionProps['updateAction'];
      updateStatusAction: PublishActionProps['updateAction'];
    };
  };

export type { SaveActionProps, PreviewActionProps, PublishActionProps, CreatorFormActionBarProps };
