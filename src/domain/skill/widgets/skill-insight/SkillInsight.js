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

import clsx from 'clsx';
import Image from 'next/image';
import { ResponsiveContainer, Treemap } from 'recharts';

import AspectaPic from './aspecta.png';

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

function CustomizedContent(props) {
  const { root, depth, x, y, width, height, index, colors, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[Math.floor((index / root.children?.length) * 6)] : 'none',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
      ) : null}
      {depth === 3 ? (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
      ) : null}
      {depth === 2 ? (
        <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
          {name}
        </text>
      ) : null}
    </g>
  );
}

function SkillInsight({
  className = undefined,
  headerClassName,
  titleClassName,
  data,
  hideHeader = false,
}) {
  return (
    <div className={className}>
      {hideHeader !== true && (
        <div className={clsx('mb-4 flex items-center justify-between', headerClassName)}>
          <h3 className={titleClassName}>Github skill insight</h3>
          <Image height={24} src={AspectaPic} alt="" />
        </div>
      )}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            width={400}
            height={200}
            data={data}
            dataKey="ranking"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}
          />
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SkillInsight;
