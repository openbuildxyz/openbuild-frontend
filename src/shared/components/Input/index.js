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

import React, {forwardRef} from 'react';

import { useInput } from '@nextui-org/input';

const styles = {
  input: [ 'bg-transparent', 'placeholder:opacity-40', 'ml-1' ],
  innerWrapper: 'border border-gray-600 hover:border-gray h-12 text-sm px-3 rounded',
  inputWrapper: [ 'shadow-none' ],
};

const MyInput = forwardRef((props, ref) => {
  const {
    Component,
    startContent,
    getBaseProps,
    getInputProps,
    getInnerWrapperProps,
  } = useInput({
    ...props,
    ref,
    classNames: {
      ...styles,
    },
  });

  const innerWrapper = React.useMemo(() => {
    if (startContent) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getInputProps()} />
        </div>
      );
    }

    return <input {...getInputProps()} />;
  }, [startContent, getInputProps, getInnerWrapperProps]);

  return (
    <div >
      <Component {...getBaseProps()}>
        {innerWrapper}
      </Component>
    </div>
  );
});

MyInput.displayName = 'OBInput';

export default MyInput;
