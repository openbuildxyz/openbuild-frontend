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

function CreatorStatusFieldCell({ status }) {
  return <p className="col-span-1">
    {status === 1 && <span>Draft</span>}
    {status === 2 && <span>Online</span>}
    {status === 3 && <span>Offline</span>}
    {status === 4 && <span>Under review</span>}
    {status === 5 && <span>Deny</span>}
  </p>;
}

export default CreatorStatusFieldCell;
