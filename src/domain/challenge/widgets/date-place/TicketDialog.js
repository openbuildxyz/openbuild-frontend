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

import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';
import Image from 'next/image';
import { useRef, useCallback, Fragment } from 'react';
import QRCode from 'react-qr-code';

import { Dialog, Transition } from '@/components/control';
import { TwitterIcon, DownloadIcon } from '@/components/Icons';
import { formatTime } from '@/utils/date';

import { useMediaUrl } from '#/state/application/hooks';

import TicketBgPic from './ticket-bg.svg';
import TicketEPic from './ticket-e.svg';

function TicketDialog({ data, open = false, onClose }) {
  const mediaUrl = useMediaUrl();
  const elementRef = useRef(null);
  const download = useCallback(() => {
    toBlob(elementRef.current, { cacheBust: true }).then(function (blob) {
      console.log(blob);
      saveAs(blob, 'openbuild-ticket.png');
    });
  }, [elementRef]);

  let courseOrChallengeUrl = '';

  if (typeof window !== 'undefined') {
    courseOrChallengeUrl = window.location.href;
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#1A1A1A] bg-opacity-60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-[800px] pr-4 pt-4 transform overflow-hidden rounded-2xl bg-transparent text-left align-middle shadow-xl transition-all">
              <div className="relative flex download_viewport items-center" ref={elementRef}>
                <svg
                  onClick={onClose}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-[-6px] top-[-16px] z-[10000] cursor-pointer"
                >
                  <path
                    d="M2.6665 2.66797L13.3332 13.3346"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.6665 13.3346L13.3332 2.66797"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="w-[464px] h-[280px] relative">
                  <Image src={TicketBgPic} alt="" className="absolute z-[1000] w-full h-full top-0 left-0" />
                  {mediaUrl && data && (
                    <Image
                      width={400}
                      height={216}
                      src={mediaUrl + data?.base.course_series_img}
                      alt=""
                      className="w-[400px] h-[216px] absolute z-[1001] left-8 top-8 object-fill rounded-lg"
                    />
                  )}

                  <Image src={TicketEPic} alt="" className="absolute z-[1002] top-0 left-0" />
                </div>
                <svg
                  width="2"
                  height="248"
                  viewBox="0 0 2 248"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1"
                    y1="1"
                    x2="0.999989"
                    y2="247"
                    stroke="#1A1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="1 5"
                  />
                </svg>

                <div className="h-[280px] flex-1 w-auto bg-ticketLocation rounded-lg p-5 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl leading-6">{data?.base.course_series_title}</h3>
                    <div className="flex mr-3 mt-3">
                      <i className="w-[45px] mr-3 text-xs">Time</i>
                      <p className="text-sm text-gray">
                        {formatTime(
                          data.challenges_extra.course_challenges_extra_start_date * 1000,
                          'YYYY/MM/DD',
                        )}{' '}
                        - {formatTime(data.challenges_extra.course_challenges_extra_end_date * 1000, 'MM/DD')}
                        {data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11) && (
                          <span className="text-xs h-4 py-[2px]">
                            {data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11)}
                          </span>
                        )}
                      </p>
                      {/* <p className="text-sm font-bold">2023/05/05 06/06 <span className="text-xs">(UTC+8)</span></p> */}
                    </div>
                    <div className="flex mt-2">
                      <i className="w-[45px] mr-3 text-xs">Location</i>
                      <p className="text-sm font-bold">
                        {data?.challenges_extra.course_challenges_extra_online
                          ? 'Online'
                          : data?.challenges_extra.course_challenges_extra_country +
                            ', ' +
                            data?.challenges_extra.course_challenges_extra_city +
                            ', ' +
                            data?.challenges_extra.course_challenges_extra_offline_address}
                      </p>
                    </div>
                  </div>

                  <hr className="border-t border-dashed border-black my-4" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {
                        <Image
                          className="border-2 mr-[5px] border-white rounded-full w-[42px] h-[42px]"
                          width={42}
                          height={42}
                          src={mediaUrl + data?.team_user?.user_avatar}
                          alt=""
                        />
                      }
                      <div>
                        <p className="text-xs">
                          <a href={`/u/${data?.team_user?.user_handle}`}>{data?.team_user?.user_nick_name}</a>
                        </p>
                        <p className="text-xs font-bold mr-1">Booking ID</p>
                      </div>
                    </div>
                    <div className="h-[60px] w-[60px] rounded bg-white p-1 overflow-hidden">
                      <QRCode
                        size={256}
                        style={{ maxWidth: '100%', width: '100%', height: '100%' }}
                        value={courseOrChallengeUrl}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-[64px] mt-8 flex text-sm w-[470px] bg-white rounded-xl p-[6px]">
                  <span
                    onClick={() =>
                      window.open(`https://twitter.com/intent/tweet?&url=${courseOrChallengeUrl}`)
                    }
                    className="flex items-center flex-1 justify-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer"
                  >
                    <TwitterIcon className="w-4 h-4 mr-2" /> Share with Twitter
                  </span>
                  <span
                    onClick={() => download()}
                    target="_blank"
                    className="flex items-center flex-1 justify-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer"
                  >
                    <DownloadIcon className="mr-2" /> Download pictures
                  </span>
                </div>
              </div>
              {/* <div ></div> */}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default TicketDialog;
