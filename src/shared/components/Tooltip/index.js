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

import React, { useCallback, useState } from 'react';

import { classNames } from '../../utils/index';
// import { PlayCircleIcon } from '../icon/solid';
import Popover from '../Popover';

export default function Tooltip({ text, children, className, ...rest }) {
  return (
    <Popover
      placement="bottom"
      content={
        <div
          className={classNames(
            className,
            'relative w-full max-w-[300px] rounded bg-gray px-3 py-2 text-xs text-white shadow-lg'
          )}
        >
          <svg
            className="icon absolute top-0 left-[46%] mt-[-10px] h-4 w-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1522"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="200"
            height="200"
          >
            <path d="M27.273 753.613l485.222-484.233 484.233 485.222z" fill="#1a1a1a" p-id="1523" />
          </svg>
          {text}
        </div>
      }
      {...rest}
    >
      {children}
    </Popover>
  );
}

export function TooltipContent({ content, children, ...rest }) {
  return (
    <Popover content={<div className="w-64 break-words py-[0.6rem] px-4">{content}</div>} {...rest}>
      {children}
    </Popover>
  );
}

export function MouseoverTooltip({ children, ...rest }) {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return (
    <Tooltip {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </Tooltip>
  );
}

export function MouseoverTooltipContent({ content, children, ...rest }) {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return (
    <TooltipContent {...rest} show={show} content={content}>
      <div
        style={{ display: 'inline-block', lineHeight: 0, padding: '0.25rem' }}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        {children}
      </div>
    </TooltipContent>
  );
}
