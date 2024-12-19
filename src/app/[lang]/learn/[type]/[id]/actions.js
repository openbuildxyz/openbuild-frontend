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

'use server'

import { revalidatePath } from 'next/cache'
import { post } from '@/utils/request'

export async function enrollAction(id) {
  try {
    const res = await post(`ts/v1/learn/general/course/opencourse/${id}/permission/enrool`, {}, { isServer: true })
    if (res.code === 200) {
      return revalidatePath('/')
    } else {
      return res
    }
  } catch (e) {
    return { message: 'Failed to request' }
  }
}

export async function revalidatePathAction() {
  return revalidatePath('/')
}

export async function growPathEnrollAction(id) {
  try {
    const res = await post(`ts/v1/learn/general/course/grow_path/${id}/permission/enrool`, {}, { isServer: true })
    console.log(res, 'res')
    if (res.code === 200) {
      return revalidatePath('/')
    } else {
      return res
    }
  } catch (e) {
    return { message: 'Failed to request' }
  }
}
