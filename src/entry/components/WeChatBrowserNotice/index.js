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

'use client';

import { useEffect, useRef, useState } from 'react';

import { XMarkIcon } from '@/components/icon/solid';

const AUTO_CLOSE_MS = 10000;
const PROGRESS_INTERVAL_MS = 100;

function WeChatBrowserNotice() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(1);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = window.navigator.userAgent || '';
    if (!/MicroMessenger/i.test(ua)) return;

    setVisible(true);
    setProgress(1);
    const start = Date.now();
    timerRef.current = window.setTimeout(() => {
      setVisible(false);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    }, AUTO_CLOSE_MS);
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.max(0, 1 - elapsed / AUTO_CLOSE_MS);
      setProgress(next);
      if (elapsed >= AUTO_CLOSE_MS && intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }, PROGRESS_INTERVAL_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  if (!visible) return null;

  const progressWidth = `${Math.round(progress * 100)}%`;

  return (
    <div className="fixed right-4 top-4 z-[60] max-w-[260px] rounded-xl border border-black/10 bg-white p-3 text-xs text-gray-900 shadow-lg">
      <div className="flex items-start gap-2">
        <div className="flex-1 pr-8">
          <p className="text-[16px] font-black leading-5 text-black">Open in browser</p>
          <p className="mt-1 text-[11px] leading-4 text-black">
            WeChat may block some features. Tap menu and choose Open in browser.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md text-gray-600 transition hover:bg-black/5 hover:text-gray-900"
        >
          <span className="pointer-events-none absolute left-1 right-1 bottom-1 h-[2px] overflow-hidden rounded-full bg-black/20">
            <span
              className="block h-full rounded-full bg-black transition-[width] duration-100 ease-linear"
              style={{ width: progressWidth }}
            />
          </span>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default WeChatBrowserNotice;
