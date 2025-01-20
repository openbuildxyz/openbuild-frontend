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

import { useState } from 'react';

export function useNumStrState(defaultVal = '') {
  const removeLeadingZeros = s => {
    const oldLen = s.length;
    s = s.replace(/^0+/, ''); // 移除前导零
    // 全为 0 的情况，留一个 0
    if (s.length === 0 && oldLen > 0) {
      s = '0';
    }
    return s;
  };

  defaultVal = removeLeadingZeros(defaultVal);
  const [numVal, setNumVal] = useState(defaultVal);

  const handleChange = val => {
    val = val.replace(/[^\d]/g, '');
    val = removeLeadingZeros(val);
    setNumVal(val);
  };

  return [numVal, handleChange];
}
