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

'use client';

import NextImage from 'next/image';
import { useState, useRef, useLayoutEffect } from 'react';

const tabs = ['Company', 'University', 'Community', 'Media'];

const partnersData = {
  Company: [],
  University: [],
  Community: [],
  Media: [],
};

function readyPartnersData() {
  for (let i = 1; i <= 42; i++) {
    partnersData.Company.push({ ele: <NextImage
      className="max-w-[160px] max-h-[40px]"
      width={160}
      height={40}
      src={`/images/svg/partner/Company/Company 0${i > 9 ? i : `0${i}`}.svg`}
      alt={`partner/Company/Company 0${i > 9 ? i : `0${i}`}`}
    />});
  }
  for (let i = 1; i <= 20; i++) {
    partnersData.University.push({ ele: <NextImage
      className="max-w-[160px] max-h-[40px]"
      width={160}
      height={40}
      src={`/images/svg/partner/University/University 0${i > 9 ? i : `0${i}`}.svg`}
      alt={`partner/University/University 0${i > 9 ? i : `0${i}`}`}
    />});
  }
  for (let i = 1; i <= 35; i++) {
    if (i === 4 || i === 12) continue;
    partnersData.Community.push({ ele: <NextImage
      className="max-w-[160px] max-h-[40px]"
      width={160}
      height={40}
      src={`/images/svg/partner/Community/Community 0${i > 9 ? i : `0${i}`}.svg`}
      alt={`partner/Community/Community 0${i > 9 ? i : `0${i}`}`}
    />});
  }
  for (let i = 1; i <= 6; i++) {
    partnersData.Media.push({ ele: <NextImage
      className="max-w-[160px] max-h-[40px]"
      width={160}
      height={40}
      src={`/images/svg/partner/Media/Media 0${i > 9 ? i : `0${i}`}.svg`}
      alt={`partner/Media/Media 0${i > 9 ? i : `0${i}`}`}
    />});
  }
}
readyPartnersData();

export function Trusted() {
  const [activeTab, setActiveTab] = useState('Company');
  const tabRefs = useRef({});
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const currentPartners = partnersData[activeTab] || [];

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeButton = tabRefs.current[activeTab];
      const indicator = indicatorRef.current;
      const container = containerRef.current;
      const scrollContainer = scrollContainerRef.current;

      if (activeButton && indicator && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;
        
        indicator.style.transform = `translateX(${left}px)`;
        indicator.style.width = `${width}px`;

        // 移动端：确保激活的 tab 在可视区域内
        if (scrollContainer && window.innerWidth < 768) {
          const scrollRect = scrollContainer.getBoundingClientRect();
          const buttonLeft = buttonRect.left - scrollRect.left;
          const buttonRight = buttonRect.right - scrollRect.left;
          const scrollLeft = scrollContainer.scrollLeft;
          const scrollWidth = scrollRect.width;

          // 如果按钮在可视区域外，滚动到可见位置
          if (buttonLeft < 0) {
            scrollContainer.scrollTo({
              left: scrollLeft + buttonLeft - 16,
              behavior: 'smooth',
            });
          } else if (buttonRight > scrollWidth) {
            scrollContainer.scrollTo({
              left: scrollLeft + buttonRight - scrollWidth + 16,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    // 初始化和更新指示器位置
    updateIndicator();
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  return (
    <div className="text-center mb-14 md:mb-[120px] newest px-10" data-aos="fade-up" data-aos-delay="500">
      <h1 className="text-[42px] leading-[52px] mb-6 max-md:text-[28px] max-md:leading-9 max-md:mb-6">Our Partners</h1>
      
      {/* Tab Navigation */}
      <div 
        ref={scrollContainerRef}
        className="flex justify-center mb-14 max-md:mb-14 max-[686px]:overflow-x-auto max-[686px]:scroll-smooth max-[686px]:justify-start"
      >
        <div 
          ref={containerRef}
          className="relative inline-flex border border-[rgba(26,26,26,0.1)] rounded-[48px] bg-white p-1.5 gap-1.5 overflow-hidden max-md:min-w-fit"
        >
          {/* 滑动指示器 */}
          <div
            ref={indicatorRef}
            className="absolute top-1.5 bottom-1.5 bg-[rgba(26,26,26,0.06)] rounded-[40px] transition-all duration-300 ease-out"
            style={{
              left: 0,
              width: 0,
            }}
          />
          
          {tabs.map(tab => (
            <button
              key={tab}
              ref={el => tabRefs.current[tab] = el}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 px-6 py-3 text-base leading-[18px] font-medium transition-colors rounded-[40px] whitespace-nowrap ${
                activeTab === tab
                  ? 'text-black'
                  : 'text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      {currentPartners.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {currentPartners.map((partner, index) => (
            <div
              key={`partner-${activeTab}-${index}`}
              className="trusted-box group border border-[rgba(26,26,26,0.1)] rounded-[1000px] px-4 py-7 flex justify-center items-center bg-white transition-colors max-md:px-3 max-md:py-6 h-24 max-md:h-20 w-full sm:w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-2.25rem)/4)] xl:w-[calc((100%-3rem)/5)] 2xl:w-[calc((100%-3.75rem)/6)] flex-shrink-0"
            >
              <div className="flex justify-center items-center w-full h-full [&>svg]:max-w-full [&>svg]:h-8 [&>svg]:w-auto">
                {partner.ele}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12">
          <p className="text-base leading-8 text-[rgba(26,26,26,0.6)]">No partners available in this category.</p>
        </div>
      )}

      {/* Footer Text */}
      {currentPartners.length > 0 && (
        <p className="text-base leading-8 text-[rgba(26,26,26,0.6)] mt-14">Selected partners, in no particular order</p>
      )}
    </div>
  );
}
