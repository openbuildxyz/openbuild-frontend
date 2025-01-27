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

export function initRunLLM() {
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      var script = document.createElement('script');
      script.type = 'module';
      script.id = 'runllm-widget-script';
      script.src = 'https://widget.runllm.com';

      script.setAttribute('version', 'stable');
      script.setAttribute('runllm-theme-color', '#64d88b');
      script.setAttribute('runllm-brand-logo', '/favicon.svg');
      script.setAttribute('runllm-keyboard-shortcut', 'Mod+j');
      script.setAttribute('runllm-name', 'OpenBuild');
      script.setAttribute('runllm-position', 'BOTTOM_RIGHT');
      script.setAttribute('runllm-assistant-id', '328');

      script.async = true;
      document.head.appendChild(script);
    });
  }
}
