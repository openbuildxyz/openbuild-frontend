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

import { getAddress } from '@ethersproject/address';

function isAddress(value) {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase());
  } catch {
    return false;
  }
}

export function shortenAddress(address, chars = 4) {
  if (!address) return 'Address Error';
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function shorten(string, chars = 4) {
  if (!string) return '';
  return `${string.substring(0, chars + 2)}...${string.substring(42 - chars)}`;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function arrRemove(arr, val) {
  const index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export const createQueryString = (name, value, params, replace) => {
  params.set('page', '1');
  if (!replace) {
    if (params.get(name)) {
      if (value === '') {
        params.set(name, '');
      } else {
        const _lable = params.get(name)?.split(',');
        if (_lable && _lable.findIndex(f => f === value) > -1) {
          const val = arrRemove(_lable, value.toString());
          params.set(name, val.toString());
        } else {
          params.set(name, `${params.get(name)},${value}`);
        }
      }
    } else {
      params.set(name, value.toString());
    }
  } else {
    params.set(name, value.toString());
  }
  return params.toString();
};

export function HTMLDecode(text) {
  if (!text) {
    return '';
  }
  if (typeof text !== 'string') {
    return String(text);
  }
  var arrEntities= { 'lt':'<', 'gt':'>' };
  return text.replace(/&(lt|gt);/ig,function(all,t){
    return arrEntities[t];
  });
  // let temp = document.createElement('div');
  // temp.innerHTML = text;
  // const output = temp.textContent || temp.innerText;
  // temp = null;
  // return output;
}

export { isEmpty, isInteger, isString, isFunction, isPlainObject, get, cloneDeep, merge, capitalize, chunk, range } from 'lodash';
