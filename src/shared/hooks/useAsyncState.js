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

import { useState, useRef, useCallback, useEffect } from 'react';

export function useAsyncState(initialState) {
  const [state, setState] = useState(initialState);
  const resolveState = useRef();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (resolveState.current) {
      resolveState.current(state);
    }
  }, [state]);

  const setAsyncState = useCallback(
    newState =>
      new Promise(resolve => {
        if (isMounted.current) {
          resolveState.current = resolve;
          setState(newState);
        }
      }),
    []
  );

  return [state, setAsyncState];
}
