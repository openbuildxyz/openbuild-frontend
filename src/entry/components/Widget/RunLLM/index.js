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

import Script from 'next/script';

export function RunLLM() {
  return (
    <Script
      type="module"
      id="runllm-widget-script"
      src="https://widget.runllm.com"
      version="stable"
      runllm-theme-color="#64d88b"
      runllm-brand-logo="/favicon.svg"
      runllm-keyboard-shortcut="Mod+j"
      runllm-name="OpenBuild"
      runllm-position="BOTTOM_RIGHT"
      runllm-assistant-id="328"
      async
    />
  );
}
