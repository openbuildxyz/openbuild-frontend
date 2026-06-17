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

import { isString, isFunction, get, cloneDeep } from './index';

function resolveConfigValue(valueFromEnv, defaultValue, resolve) {
  if (valueFromEnv === undefined) {
    return defaultValue;
  }

  return isFunction(resolve) ? resolve(valueFromEnv) : valueFromEnv;
}

function resolvePublicConfigValue(publicValueFromEnv, valueFromEnv, defaultValue, resolve) {
  return resolveConfigValue(
    publicValueFromEnv === undefined ? valueFromEnv : publicValueFromEnv,
    defaultValue,
    resolve,
  );
}

const appConfig = {
  devPlaza: {
    enabled: resolveConfigValue(process.env.OB_DEVPLAZA_ENABLED, true, value => value !== 'false'),
  },
  aiAgent: {
    enabled: resolveConfigValue(process.env.OB_AIAGENT_ENABLED, true, value => value !== 'false'),
  },
  assistant: {
    enabled: resolvePublicConfigValue(
      process.env.NEXT_PUBLIC_OB_ASSISTANT_ENABLED,
      process.env.OB_ASSISTANT_ENABLED,
      false,
      value => value === 'true',
    ),
    path: resolvePublicConfigValue(
      process.env.NEXT_PUBLIC_OB_ASSISTANT_PATH,
      process.env.OB_ASSISTANT_PATH,
      '/assistant',
    ),
    difyUrl: resolvePublicConfigValue(
      process.env.NEXT_PUBLIC_OB_DIFY_CHATBOT_URL,
      process.env.OB_DIFY_CHATBOT_URL,
      'https://ai.openbuild.xyz/chatbot/IjylvCt33JZvfyRF',
    ),
  },
};

function _getAppConfig(config, keyPath) {
  return cloneDeep(isString(keyPath) ? get(config, keyPath) : config);
}

const getAppConfig = _getAppConfig.bind(null, appConfig);

function getCopyrightText() {
  return `© ${new Date().getFullYear()} OpenBuild, All rights reserved.`;
}

export { _getAppConfig, getAppConfig, getCopyrightText };
