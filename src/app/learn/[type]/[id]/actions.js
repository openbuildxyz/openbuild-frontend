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

'use server';

import { revalidatePath } from 'next/cache';

import { enrollOne as enrollCourse } from '#/domain/course/repository';
import { enrollOne as enrollRoadmap } from '#/domain/roadmap/repository';

export async function enrollAction(id) {
  try {
    const res = await enrollCourse(id);
    return res.success ? revalidatePath('/') : res;
  } catch (e) {
    return { message: 'Failed to request' };
  }
}

export async function revalidatePathAction() {
  return revalidatePath('/');
}

export async function growPathEnrollAction(id) {
  try {
    const res = await enrollRoadmap(id);
    return res.success ? revalidatePath('/') : res;
  } catch (e) {
    return { message: 'Failed to request' };
  }
}
