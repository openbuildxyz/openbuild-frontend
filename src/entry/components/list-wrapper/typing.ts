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

import type { DataValue } from '@/types';
import type { ClassValue } from 'clsx';
import type { JSXElementConstructor, PropsWithChildren, ReactNode } from 'react';

type ListProps = {
  className?: ClassValue;
  data: Record<string, DataValue>[];
  total: number;
};

type ListCtor = JSXElementConstructor<PropsWithChildren<ListProps>>;

type ListProxyProps = ListProps & {
  listCtor: ListCtor;
}

type ListWrapperProps = ListProxyProps & {
  placeholder?: ReactNode;
  search?: ReactNode;
  type?: string;
  searchClassName?: ClassValue;
  listClassName?: ClassValue;
};

export type { ListCtor, ListProps, ListProxyProps, ListWrapperProps };
