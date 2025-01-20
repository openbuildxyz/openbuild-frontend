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

import { useState, useEffect } from 'react';

import Loader from '../Loader';
import { NoData } from '../NoData';

function LoadableList({ params, fetch, resolveResponse, renderList }) {
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    setLoading(true);
    fetch({ ...params, skip: (pageNum - 1) * 20 })
      .then(res => {
        const resolvedRes = resolveResponse(res);
        const resolvedList = resolvedRes.list || [];

        if (pageNum === 1) {
          setList(resolvedList);
        } else {
          setList(prev => [].concat(prev, resolvedList));
        }

        setTotal(resolvedRes.total || 0);
      })
      .finally(() => setLoading(false));
  }, [params, pageNum]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {list.length > 0 && renderList(list)}
      {loading ? (
        <div className="flex justify-center">
          <Loader color="#1a1a1a" />
        </div>
      ) : (
        <>
          {list.length === 0 && <NoData />}
          {list.length < total && (
            <div onClick={() => setPageNum(pageNum + 1)} className="flex bg-gray-400 justify-center gap-2 h-9 items-center cursor-pointer rounded group">
              <svg className="opacity-40 transition-all group-hover:opacity-80" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M14.25 4.75L9.5 9.5L4.75 4.75" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.25 9.5L9.5 14.25L4.75 9.5" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
              <span className="opacity-40 transition-all group-hover:opacity-80">More</span>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default LoadableList;
