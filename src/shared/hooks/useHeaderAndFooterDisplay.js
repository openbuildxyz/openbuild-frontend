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


import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const hiddenPath = ['/signin', 'signup', '/forgot', '/reset', '/change', '/questions', '/oauth']

export function useHeaderAndFooterDisplay() {
  const pathname = usePathname()
  
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const h = hiddenPath.map(i => pathname.includes(i) ? 1 : 0)
    h.includes(1) ? setHidden(true) : setHidden(false)
  }, [pathname])
  return hidden
}
const footerHiddenPath = ['/signin', 'signup', '/forgot', '/reset', '/change', '/profile', '/creator', '/questions', '/oauth']
export function useFooterDisplay() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const h = footerHiddenPath.map(i => pathname.includes(i) ? 1 : 0)
    h.includes(1) ? setHidden(true) : setHidden(false)
  }, [pathname])
  return hidden
}