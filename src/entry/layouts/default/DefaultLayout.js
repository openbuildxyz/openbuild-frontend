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

'use client'

import { Header } from '../../components/Header'
import { Footer } from './Footer'

import { LayoutModals } from './LayoutModals'

function DefaultLayout({ children }) {
  return (
    <div className="text-gray">
      <Header />
      <div className="relative flex-1 bg-[#F8F8F8]">{children}</div>
      <Footer />
      <LayoutModals />
    </div>
  )
}

export default DefaultLayout
