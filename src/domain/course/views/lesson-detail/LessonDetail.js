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

import { OViewer } from '@/components/MarkDown';
import CustomVideoPlayer from '@/components/VideoPlayer/CustomVideoPlayer';

// FIXME: 临时方案
function resolveContent(rawContent) {
  if (!rawContent) {
    return rawContent;
  }

  const matchedSrc = /src="([^"]*)"/i.exec(rawContent);

  // FIXME: 暂且这么不严谨地判断视频地址
  if (!matchedSrc || matchedSrc[1].toLowerCase().indexOf('youtube') > -1) {
    return rawContent;
  }

  const videoUrl = matchedSrc[1];
  const videoStr = `<video autoplay controls controlslist="nodownload"><source src="${videoUrl}" type="video/${videoUrl.split('.').pop().toLowerCase()}"></source></video>`;

  return rawContent.replace(/<iframe\s+([^>]*)><\/iframe>/i, videoStr);
}

function LessonDetailView({ data = {} }) {
  return (
    <>
      <h2 className="text-4xl mb-9 pb-9 border-b border-gray-400">{data.course_single_name}</h2>
      {
        !!data.course_single_video_url &&
          <div className="w-full aspect-video mb-6">
            <CustomVideoPlayer
              url={data.course_single_video_url}
              width="100%"
              height="100%"
            />
          </div>
      }
      <OViewer value={resolveContent(data.course_single_content)} />
    </>
  );
}

export default LessonDetailView;
