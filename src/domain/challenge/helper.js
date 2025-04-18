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

// FIXME: use a more precise way to judge instead
function isChallenge(id) {
  const stringified = id.toString();

  return stringified.length > 3 && stringified.startsWith('2');
}

const statusMap = {
  '-2': 'Declined',
  '-1': 'Waiting',
  0: 'Not joined',
  1: 'Joined',
  2: 'Done',
  3: 'Unpaid',
  4: 'Paid',
};

function isAgreeable(status) {
  return [-2, -1].includes(status);
}

function isDeclinable(status) {
  return status === -1;
}

function isBeAgreed(status) {
  return status === 1;
}

function isBeDeclined(status) {
  return status === -2;
}

function getStatusLabel(status) {
  return statusMap[status] || '';
}

export { isChallenge, isAgreeable, isDeclinable, isBeAgreed, isBeDeclined, getStatusLabel };
