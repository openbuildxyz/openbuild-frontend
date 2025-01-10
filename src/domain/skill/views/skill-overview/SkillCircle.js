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

function SkillCircle({ level }) {
  return (
    <svg width="20" height="20" viewBox="0 0 440 440">
      <circle
        cx="220"
        cy="220"
        r="170"
        strokeWidth="40"
        stroke="rgba(16,16,16,0.1)"
        fill="none"
      />
      <circle
        cx="220"
        cy="220"
        r="170"
        strokeWidth="40"
        stroke="rgba(16,16,16,0.4)"
        fill="none"
        transform="matrix(0,-1,1,0,0,440)"
        style={{
          strokeDasharray:
            level === 'generally'
              ? '267 1069'
              : level === 'well'
              ? '534 1069'
              : level === 'proficient'
              ? '801 1069'
              : '1069 1069',
        }}
      />
    </svg>
  )
}

export default SkillCircle
