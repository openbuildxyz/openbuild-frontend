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

import { useState } from 'react';

import { NoData } from '@/components/NoData';
import useMounted from '@/hooks/useMounted';

import { fetchUserSkills } from '../../repository';
import SkillInsight from '../../widgets/skill-insight';
import SkillLevel from '../../widgets/skill-level';

function SkillOverviewView({ userId }) {
  const [data, setData] = useState({});

  useMounted(() => {
    fetchUserSkills(userId)
      .then(res => {
        setData(res?.data);
      });
  });

  return (
    <div>
      <div className="mt-6">
        {data?.skill_datas && data?.skill_datas.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Skills</h3>
            </div>
            <SkillLevel data={data} />
          </>
        ) : (
          <NoData />
        )}
      </div>
      {data?.aspecta_show && (
        <SkillInsight
          data={data?.skill_user.user_extra_skills}
          headerClassName="mt-9"
          titleClassName="text-sm font-semibold"
        />
      )}
    </div>
  );
}

export default SkillOverviewView;
