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

// Import all available images
/* eslint-disable */
import KingImg from 'public/images/home/king.png';
import WfnuserImg from 'public/images/home/wfnuser.jpeg';
import XiangnuanImg from 'public/images/home/xiangnuan.jpeg';
import AsQnPgq2Img from 'public/images/home/asQnPgq2.jpg';
import OxIHRRImg from 'public/images/home/Ox_IHRR.jpeg';
import ZJGpkRjRImg from 'public/images/home/ZJGpkRjR.jpg';
import FQaCbA83Img from 'public/images/home/FQaCbA83.jpg';
import DajiangjunokImg from 'public/images/home/dajiangjunok.jpg';
import KkGgJzyfImg from 'public/images/home/KkGgJzyf.jpeg';
import GJuJaje5Img from 'public/images/home/GJuJaje5.jpg';
import VeithlyImg from 'public/images/home/veithly.jpg';
import YoungImg from 'public/images/home/Young.jpg';
import MdnPA6pRImg from 'public/images/home/MdnPA6pR.png';
import YacoImg from 'public/images/home/YaCo.png';
import Lww599Img from 'public/images/home/lww599.jpg';
import SethzhaoImg from 'public/images/home/sethzhao.webp';
import PhoouzeImg from 'public/images/home/Phoouze.jpg';
import FJWcpmgaImg from 'public/images/home/fJWcpmga.jpg';
import QiuqiuImg from 'public/images/home/qiuqiu.png';
import BZvYnd5kImg from 'public/images/home/BZvYnd5k.gif';
import LilittlekangImg from 'public/images/home/lilittlekang.jpg';
import ZhangWenchaoImg from 'public/images/home/zhang-wenchao.png';
import LeeMmaiImg from 'public/images/home/LeeMmai.jpg';
import VCNelsonZImg from 'public/images/home/VCNelson_Z.jpeg';
/* eslint-enable */

import { SvgIcon } from '@/components/Image';

// Image mapping: identifier -> image
const IMAGE_MAP = {
  // Handle mappings
  'King': KingImg,
  'wfnuser': WfnuserImg,
  'xiangnuan': XiangnuanImg,
  'asQnPgq2': AsQnPgq2Img,
  'ZJGpkRjR': ZJGpkRjRImg,
  'FQaCbA83': FQaCbA83Img,
  'KkGgJzyf': KkGgJzyfImg,
  'GJuJaje5': GJuJaje5Img,
  'veithly': VeithlyImg,
  'Young': YoungImg,
  'MdnPA6pR': MdnPA6pRImg,
  'YaCo': YacoImg,
  'UmkZPTTF': Lww599Img, // ww uses lww599
  'Phoouze': PhoouzeImg,
  'fJWcpmga': FJWcpmgaImg,
  'qiuqiu': QiuqiuImg,
  'BZvYnd5k': BZvYnd5kImg,
  'lilittlekang': LilittlekangImg,
  
  // GitHub mappings (for fallback)
  'lispking': KingImg,
  'wfnuser': WfnuserImg,
  'xiangnuans': XiangnuanImg,
  'JintolChan': AsQnPgq2Img,
  '0x-IHRR': OxIHRRImg,
  'sherryxie995': ZJGpkRjRImg,
  'everyeveryV': FQaCbA83Img,
  'dajiangjunok': DajiangjunokImg,
  'Nakiswen': KkGgJzyfImg,
  'blakeees': GJuJaje5Img,
  'liyincode': YoungImg,
  'majoson-chen': MdnPA6pRImg,
  'OS-Lihua': YacoImg,
  'lww599': Lww599Img,
  'sethzhao': SethzhaoImg,
  'phoouze': PhoouzeImg,
  'jueduizone': FJWcpmgaImg,
  'zhengqiuwan': QiuqiuImg,
  'love2sweet': BZvYnd5kImg,
  'Ritakang0451': LilittlekangImg,
  'zhang-wenchao': ZhangWenchaoImg,
  'LeeMaimai': LeeMmaiImg,
  
  // X/Twitter mappings (for fallback)
  'lispking': KingImg,
  'weriaolilun': WfnuserImg,
  'coco69564520': XiangnuanImg,
  'JintolOfficial': AsQnPgq2Img,
  '0x_cat_Student': OxIHRRImg,
  'VCNelson_Z': VCNelsonZImg,
  'everyevery91608': FQaCbA83Img,
  'Alger779503577': DajiangjunokImg,
  'AlvinWang9521': KkGgJzyfImg,
  'Blakeesss': GJuJaje5Img,
  'RickyEACC': VeithlyImg,
  'young_x_': YoungImg,
  'YoukinChen': MdnPA6pRImg,
  '0xYaCo': YacoImg,
  'ww599_': Lww599Img,
  'seth_zhao': SethzhaoImg,
  'Phoouze': PhoouzeImg,
  'imxy007': FJWcpmgaImg,
  '0xqiuqiuu': QiuqiuImg,
  'alwaylove2sweet': BZvYnd5kImg,
  'kk860755': LilittlekangImg,
  'wenchao_zh': ZhangWenchaoImg,
  'LeeMmai': LeeMmaiImg,
};

// Function to get image by priority: handle -> github -> x
const getImage = (handle, github, x) => {
  if (handle && IMAGE_MAP[handle]) {
    return IMAGE_MAP[handle];
  }
  if (github && IMAGE_MAP[github]) {
    return IMAGE_MAP[github];
  }
  if (x && IMAGE_MAP[x]) {
    return IMAGE_MAP[x];
  }
  return DefaultImg;
};

const DATAS = [
  { name: 'King', x: 'lispking', github: 'lispking', title: 'Fullstack Engineer', handle: 'King' },
  { name: '微扰 \\ Qinghao', x: 'weriaolilun', github: 'wfnuser', title: 'Fullstack Engineer', handle: 'wfnuser' },
  { name: '向暖', x: 'coco69564520', github: 'xiangnuans', title: 'Fullstack Engineer', handle: 'xiangnuan' },
  { name: 'LeeMaimai', x: 'LeeMmai', github: 'LeeMaimai', title: 'Marketing', handle: null },
  { name: 'Jintol', x: 'JintolOfficial', github: 'JintolChan', title: 'Fullstack Engineer', handle: 'asQnPgq2' },
  { name: '小白', x: '0x_cat_Student', github: '0x-IHRR', title: 'Product Manager; Designer', handle: null },
  { name: '许嘉媛', x: null, github: 'sherryxie995', title: 'Backend Engineer', handle: 'ZJGpkRjR' },
  { name: 'Nelson', x: 'VCNelson_Z', github: null, title: 'Product Manager; Community Operation; Marketing', handle: null },
  { name: '每每', x: 'everyevery91608', github: 'everyeveryV', title: 'Community Operation; Writer', handle: 'FQaCbA83' },
  { name: '大大黄', x: 'Alger779503577', github: 'dajiangjunok', title: 'Contract Engineer; Frontend Engineer', handle: null },
  { name: 'alvinwang', x: 'AlvinWang9521', github: 'Nakiswen', title: 'Fullstack Engineer', handle: 'KkGgJzyf' },
  { name: 'Blake', x: 'Blakeesss', github: 'blakeees', title: 'Writer', handle: 'GJuJaje5' },
  { name: 'veithly', x: 'RickyEACC', github: 'veithly', title: 'Fullstack Engineer; Writer', handle: 'veithly' },
  { name: 'Young', x: 'young_x_', github: 'liyincode', title: 'Frontend Engineer;Fullstack Engineer', handle: 'Young' },
  { name: 'Majoson', x: 'YoukinChen', github: 'majoson-chen', title: 'Fullstack Engineer; Product Manager; Community Operation; Writer', handle: 'MdnPA6pR' },
  { name: 'YaCo', x: '0xYaCo', github: 'OS-Lihua', title: 'Contract Engineer; Backend Engineer; Product Manager; Community Operation', handle: 'YaCo' },
  { name: 'ww', x: 'ww599_', github: 'lww599', title: 'BuilderHero', handle: 'UmkZPTTF' },
  { name: 'Seth Zhao', x: 'seth_zhao', github: 'sethzhao', title: 'Fullstack Engineer', handle: null },
  { name: '小符', x: 'Phoouze', github: 'phoouze', title: 'BuilderHero', handle: 'Phoouze' },
  { name: 'Ian', x: 'imxy007', github: 'jueduizone', title: 'BuilderHero', handle: 'fJWcpmga' },
  { name: '0xqiuqiuu', x: '0xqiuqiuu', github: 'zhengqiuwan', title: 'BuilderHero', handle: 'qiuqiu' },
  { name: 'sweet', x: 'alwaylove2sweet', github: 'love2sweet', title: 'BuilderHero', handle: 'BZvYnd5k' },
  { name: 'Kang', x: 'kk860755', github: 'Ritakang0451', title: 'BuilderHero', handle: 'lilittlekang' },
  { name: 'WenChao', x: 'wenchao_zh', github: 'zhang-wenchao', title: 'BuilderHero', handle: null },
].map(item => ({
  ...item,
  picture: getImage(item.handle, item.github, item.x)
}));

export function Contributor() {
  return (
    <div className="pt-14 rounded-t-2xl bg-home-contributor-bg !px-0">
      <div className="max-md:flex-col flex justify-between items-end mb-10 max-md:mb-6 px-24">
        <h1 className="max-md:text-center max-md:text-[28px] max-md:leading-9 text-[42px] leading-[52px] max-w-[508px]" data-aos="fade-right" data-aos-delay="500">OpenBuild Community Contributor</h1>
        <p className="max-md:text-center max-md:mt-4 text-xl leading-8 max-w-[768px] hyphens-auto text-right shrink ml-4" data-aos="fade-left" data-aos-delay="500">Provide high-quality Web3 technical content.Share job opportunities/bounties with developers.Build an open community together.</p>
      </div>
      <div className="px-24 mb-[160px] max-md:mb-14" data-aos="zoom-in-up" data-aos-delay="800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {DATAS.map((contributor, index) => (
            <div
              key={`contributor-card-${index}`}
              className="relative bg-white rounded-xl shadow-sm flex flex-col hover:shadow-md transition-shadow border border-gray-600 overflow-hidden"
            >
              {/* External link icon in top-right */}
              {contributor.handle && (
                <a
                  href={`https://openbuild.xyz/u/${contributor.handle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-1 right-1 z-10 w-7 h-7 flex items-center justify-center rounded-[30px] bg-gray-800 hover:bg-gray transition-colors group"
                  aria-label="External link"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9095 7.23138L7.2312 15.9097" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
                    <path d="M10.1254 7.23157H15.9109V13.0171" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
                  </svg>
                </a>
              )}

              {/* Upper section with padding */}
              <div className="px-3 pt-5 pb-3 flex flex-col items-center flex-1">
                {/* Profile picture */}
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-100 flex-shrink-0">
                  <img
                    src={contributor.picture.src || contributor.picture}
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-center mb-1 w-full truncate font-bold text-base leading-4">
                  {contributor.name}
                </h3>

                {/* Title */}
                {contributor.title && (
                  <p className="text-center w-full truncate font-normal text-sm leading-4">
                    {contributor.title}
                  </p>
                )}
              </div>

              {/* Social links section - full width */}
              <div className="w-full h-9 flex justify-center items-center gap-3 rounded-b-xl bg-gray-800">
                {contributor.x && (
                  <a
                    href={`https://twitter.com/${contributor.x}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label={`${contributor.name} on X (Twitter)`}
                  >
                    <SvgIcon name="contributor-x" size={16} />
                  </a>
                )}
                {/* GitHub link */}
                {contributor.github && (
                  <a
                    href={`https://github.com/${contributor.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label={`${contributor.name} on GitHub`}
                  >
                    <SvgIcon name="contributor-github" size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
