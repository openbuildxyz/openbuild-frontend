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

// import { useInView } from 'react-intersection-observer';

export function Sections({ section, change, data, type, id }) {
  const { title, content } = section;

  // const rootEle = document.getElementById('creator')

  // const { ref } = useInView({
  //   threshold: 1,
  //   onChange: (inView, entry) => {
  //     if (inView) {
  //       setVisibleSection(entry.target.id);
  //     }
  //   }
  // });

  const RenderDom = content
  // ref={ref} 
  return (
    <section id={title} className="pb-[100px] mb-[100px] border-b border-gray-600">
      <RenderDom change={change} data={data} type={type} id={id}  />
    </section>
  );
}
