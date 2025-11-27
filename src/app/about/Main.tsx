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

import { ArrowUpRight, ArrowDown, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HomeTopBg from 'public/images/about/about-top-bg.png';
// Placeholder for other images
import Community1 from 'public/images/about/communities-1.png';
import Community2 from 'public/images/about/communities-2.png';
import Community3 from 'public/images/about/communities-3.png';
import Community4 from 'public/images/about/communities-4.png';
import EcosystemAccording from 'public/images/about/ecosystem-according.png';
import EcosystemAIMOverse from 'public/images/about/ecosystem-aimoverse.png';
import EcosystemDeprank from 'public/images/about/ecosystem-deprank.png';
import EcosystemDP from 'public/images/about/ecosystem-dp.png';
import EcosystemFluxus from 'public/images/about/ecosystem-fluxus.png';
import EcosystemHummanta from 'public/images/about/ecosystem-hummanta.png';
// Ecosystem icons
import EcosystemOpenBuild from 'public/images/about/ecosystem-openbuild.png';
import EcosystemOSKey from 'public/images/about/ecosystem-oskey.png';
import EcosystemWeb3Insights from 'public/images/about/ecosystem-web3insights.png';
import QRCode from 'public/images/about/qrcode.png'; // Placeholder
import Service1 from 'public/images/about/service-1.png';
import Service2 from 'public/images/about/service-2.png';
import Service3 from 'public/images/about/service-3.png';
import Service4 from 'public/images/about/service-4.png';
import letsstart from 'public/images/about/letsstart.png';
import findus1 from 'public/images/about/findus-1.svg';
import findus2 from 'public/images/about/findus-2.svg';
import findus3 from 'public/images/about/findus-3.svg';
import findus4 from 'public/images/about/findus-4.svg';
import findusHand from 'public/images/about/findus-hand.png';
import findusContributor from 'public/images/about/findus-contributor.png';
import findusSocialMediaArrow from 'public/images/about/findus-social-media-arrow.svg';
import GithubIcon from 'public/images/svg/github_p.svg';

import { Button } from '@/components/Button';

export default function AboutMain() {
  const services = [
    {
      id: 1,
      title: 'Developers\' Education & Growth',
      items: [
        'Online Workshop / AMA',
        'In-depth Tech Articles/Interviews',
        'Online Bootcamp & Quiz',
        'Local Community Ops',
        'DevRel Consultant',
      ],
      image: Service1,
      link: '#',
    },
    {
      id: 2,
      title: 'Community Influence & Events',
      items: [
        'IRL Meetup / Workshop / Conference',
        'IRL / URL Hackathon',
        'IRL Hackerhouse',
      ],
      image: Service2,
      link: '#',
    },
    {
      id: 3,
      title: 'Ecosystem Project Sourcing',
      items: [
        'Bounties & Grants Ops',
        'Talent & Projects Database',
      ],
      image: Service3,
      link: '#',
    },
    {
      id: 4,
      title: 'Developer Ops Platform & Tools',
      items: [
        'Education & Bounty Platform',
        'Developer Data Analytics Platform',
        'DevPlaza',
        'Infrastructure Support',
      ],
      image: Service4,
      link: '#',
    },
  ];

  const ecosystem = [
    {
      name: 'OpenBuild',
      description: 'The most comprehensive developer growth system product.',
      url: 'github.com/openbuildxyz',
      icon: EcosystemOpenBuild,
    },
    {
      name: 'Web3Insights',
      description: 'A comprehensive metric system for evaluating Web3 Ecosystems, Communities and Repos.',
      url: 'github.com/web3insights',
      icon: EcosystemWeb3Insights,
    },
    {
      name: 'DevPlaza',
      description: 'Open-source development framework for rapidly building localized Web3 community platforms',
      url: 'github.com/openbuildxyz/devplaza',
      icon: EcosystemDP,
    },
    {
      name: 'OSKey',
      description: 'OSKey is a fully open-source, non-commercial hardware wallet project',
      url: 'github.com/openbuildxyz',
      icon: EcosystemOSKey,
    },
    {
      name: 'AIMOverse',
      description: 'Amico is the next generation Autonomous AI Agent Framework tailored for embedded AI devices and multi-agent systems',
      url: 'github.com/AIMOverse',
      icon: EcosystemAIMOverse,
    },
    {
      name: 'According.work',
      description: 'A trustless coordination layer for developers - turning code into contributions, and contributions into rewards',
      url: 'according.work',
      icon: EcosystemAccording,
    },
    {
      name: 'Hummanta',
      description: 'Hummanta is a collection of modular, reusable compiler and toolchain technologies for smart contract programming languages',
      url: 'github.com/hummanta',
      icon: EcosystemHummanta,
    },
    {
      name: 'Deprank',
      description: 'Open Source Contribution & Allocation Audit System',
      url: 'github.com/deprank',
      icon: EcosystemDeprank,
    },
    {
      name: 'Fluxus',
      description: 'Fluxus is a lightweight stream processing engine written in Rust, designed for efficient real-time data processing and analysis',
      url: 'github.com/flusux',
      icon: EcosystemFluxus,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-14 pb-[92px] overflow-hidden">
        {/* Background gradient from green to white */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image src={HomeTopBg} alt="Background" fill className="object-cover" />
        </div>
        
        <div className="relative z-10 mx-auto px-4 md:px-8 text-center">
          <p className="text-[18px]/[20px] mb-4">About OpenBuild</p>
          <h1 className="text-[56px]/[64px] font-extrabold mb-9">
            Bridge Web2 to Web3
          </h1>
          <p className="max-w-2xl mx-auto mb-7 text-[22px]/[28px] font-bold">
            OpenBuild is the Biggest Web3 Open-Source Community in Asia. 
          </p>

          <p className="max-w-2xl mx-auto mb-9 text-[22px]/[28px]">
            We are committed to guiding more developers into Web3, encouraging open-source contributions, and fostering both individual and ecosystem-wide business success!
          </p>
          
          {/* Icons */}
          <div className="flex justify-center items-center mb-4">
            {[Community1, Community2, Community3, Community4].map((img, i) => (
              <div 
                key={i}
                className="rounded-full border-1 p-3.5 bg-white relative"
                style={{
                  borderColor: 'rgba(26, 26, 26, 0.12)',
                  marginLeft: i > 0 ? '-14px' : '0',
                  zIndex: i + 1,
                }}
              >
                <Image src={img} alt={`Community ${i + 1}`} width={24} height={24} />
              </div>
            ))}
          </div>

          <p className="max-w-[385px] mx-auto mb-9 text-[16px]/[18px] opacity-80">
            Backed by among the most influential developer and open-source communities in China.
          </p>

          <div className="flex justify-center items-center mb-14"><ArrowDown size={24} /></div>

          {/* Stats Cards */}
          <div 
            className="flex flex-wrap justify-center gap-4 md:gap-[120px] max-w-[1180px] mx-auto px-6 md:px-8 py-8 rounded-full border-2"
            style={{
              background: 'linear-gradient(90deg, rgba(248, 248, 248, 0) 0%, rgba(255, 255, 255, 0.82) 55.29%, rgba(248, 248, 248, 0) 100%)',
              boxShadow: '0px 0px 24px 0px rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(37px)',
              borderImageSource: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(248, 248, 248, 0.1) 100%)',
            }}
          >
            {[
              { num: '35K+', label: 'Registered Devs' },
              { num: '500K+', label: 'Developers Pool' },
              { num: '50K+', label: 'Followers' },
              { num: '40+', label: 'Partners' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[46px]/[56px] tracking-[-0.92px] mb-2 font-extrabold">{stat.num}</div>
                <div className="text-[20px]/[20px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* We're working on Section */}
      <div className="pt-7 pb-[60px]">
        <div className="max-w-[1680px] mx-auto px-11">
          <h2 className="text-[42px]/[52px] font-extrabold text-center mb-6">We&apos;re working on</h2>
          <p className="text-center mb-9 max-w-2xl mx-auto text-[26px]/[36px]">
            Explore our services, witness our success stories, and join us to <span className="font-extrabold">build the next milestone together.</span>
          </p>
          <p className="text-center text-[16px]/[20px] mb-[56px] flex justify-center gap-3.5">
            Let&apos;s discuss the next big thing in Web3. <ArrowRight size={24} /> <a href="#" className="underline font-bold text-[20px]/[20px] tracking-[-0.4px]">Book a call</a>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map(service => (
              <div key={service.id} className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden z-0" style={{
                paddingTop: '46%',
                '--hover-padding-top': 'calc(46% - 20px)'
              } as React.CSSProperties & { '--hover-padding-top': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.paddingTop = 'calc(46% - 20px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingTop = '46%';
              }}>
                <div className="absolute top-0 left-0 h-52 w-full overflow-hidden z-[-1]">
                  <Image src={service.image} alt={service.title} className="object-contain" />
                </div>
                <div className="flex flex-col flex-1 rounded-xl z-1 bg-white" style={{
                  boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)',
                }}>
                  <div className="px-6 py-5 flex-1">
                    <div className="text-[14px]/[18px] font-semibold mb-3 opacity-60">Services {service.id}</div>
                    <h3 className="font-bold text-[26px]/[30px] mb-6">{service.title}</h3>
                    <ul className="space-y-1.5 mb-6 flex-grow">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="text-[16px]/[18px] font-semibold flex items-start">
                          <Check size={14} className="mr-2 mt-[2px]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t p-6 mt-auto" style={{
                    borderColor: 'rgba(26, 26, 26, 0.06)',
                  }}>
                    <Link href={service.link} className="flex items-center justify-between text-[18px]/[20px] font-bold tracking-[-0.36px]">
                        More <ArrowUpRight size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Open-Source Ecosystem */}
      <div className="py-[60px]">
        <div className="max-w-[1370px] mx-auto px-4 md:px-11">
          <h2 className="font-extrabold text-[42px]/[42px] text-center mb-9">Our Open-Source Ecosystem</h2>
          <div className="text-center mb-9">
            <a href="#" className="text-[16px]/[20px] inline-flex items-center gap-3.5">
               For more projects, please visit <ArrowRight size={24} /> <a href="#" className="underline font-bold text-[20px]/[20px] tracking-[-0.4px]">View More</a>
            </a>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-0">
            {ecosystem.map((project, idx) => (
              <div key={idx} className="rounded-[30px] py-8 px-6 flex gap-5 border bg-[#F8F8F8] hover:bg-white" style={{
                margin: '-0.5px',
              }}>
                <div className="w-18 h-18 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image src={project.icon} alt={project.name} width={72} height={72} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[24px]/[28px] mb-2">{project.name}</h3>
                  <p className="text-[16px]/[22px] mb-3">{project.description}</p>
                  <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 flex items-center gap-1">
                    <Image src={GithubIcon} alt="Github" width={16} height={16} />
                    {project.url}
                  </a>
                </div>
              </div>
            ))}
            <div className="absolute z-[-1]" style={{
              background: 'rgba(1, 219, 131, 1)',
              width: '50%',
              height: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}></div>
          </div>
        </div>
      </div>

      {/* Find Us Here */}
      <div className="pt-[60px] pb-[120px]">
        <div className="mx-auto px-4 md:px-8">
          <h2 className="font-extrabold text-[42px]/[52px] text-center mb-6">Find Us Here</h2>
          <p className="text-center mb-9 max-w-2xl mx-auto text-[26px]/[36px]">
              Whether you&apos;re looking for updates, events, resources, or a place to meet fellow builders, you can find us here and stay plugged in.
          </p>
           
          <div className="flex justify-center">
            {/* WeChat */}
            <div className="bg-[#A4D870] rounded-[24px] flex flex-col items-center relative w-[295px] h-[350px] overflow-hidden mx-[18px]">
              <div className="bg-white rounded-xl absolute w-[253px] h-[324px] top-[24px] left-[21px] right-[21px]">
                <Image src={QRCode} alt="WeChat" width={180} height={180} className="mx-auto mt-[23px]" />
              </div>
              <div className="flex w-full absolute bottom-0 left-0 right-0">
                <Image src={findus1} alt="findus-bg-1" className="w-full" />
                <h3 className="font-bold text-[26px]/[29px] text-[#2A600E] absolute left-4 right-10 bottom-6">WeChat Public Account</h3>
              </div>
              <div className="absolute bottom-20 right-2 pointer-events-none">
                <Image src={findusHand} alt="findus-wechat-hand" width={74} height={74} />
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#E3BD59] rounded-[24px] flex flex-col items-center relative w-[295px] h-[350px] overflow-hidden mx-[18px]">
              <div className="bg-white rounded-xl absolute w-[253px] h-[324px] top-[24px] left-[21px] right-[21px] p-6" style={{
                boxShadow: '0px -4px 24px 0px rgba(201, 164, 63, 1)',
                rotate: '3.8deg',
              }}></div>
              <div className="bg-white rounded-xl absolute w-[253px] h-[324px] top-[48px] left-[21px] right-[21px] p-6" style={{
                boxShadow: '0px -4px 24px 0px rgba(201, 164, 63, 0.2)',
              }}>
                <p className="text-[20px]/[26px] font-medium mb-2 mb-9">For business cooperation, please contact us.</p>
                <a href="mailto:build@openbuild.xyz" className="font-semibold text-[20px]/[20px] underline tracking-[-0.4px] hover:bg-gray hover:text-white">build@openbuild.xyz</a>
              </div>
              <div className="flex w-full absolute bottom-0 left-0 right-0">
                <Image src={findus2} alt="findus-bg-2" className="w-full" />
                <h3 className="font-bold text-[26px]/[29px] text-[#754913] absolute left-4 right-10 bottom-6">OpenBuild E-mail</h3>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#E8755A] rounded-[24px] flex flex-col items-center relative w-[295px] h-[350px] overflow-hidden mx-[18px]">
              <div className="absolute w-[253px] top-[24px] left-[21px] right-[21px]">
                <div className="group cursor-pointer flex items-start justify-between pt-4 px-6 bg-white rounded-xl h-[255px] w-full" style={{
                  boxShadow: '0px -4px 24px 0px rgba(232, 117, 90, 1)',
                }}>
                  <span className="text-[20px]/[26px] font-bold">Bilibili</span>
                  <Image src={findusSocialMediaArrow} alt="findus-social-media-arrow" width={15} height={9} className="mt-2.5 hidden group-hover:block" />
                </div>
                <div className="group cursor-pointer flex items-start justify-between pt-4 px-6 bg-white rounded-xl h-[255px] absolute top-[54px] w-full" style={{
                  boxShadow: '0px -4px 24px 0px rgba(232, 117, 90, 1)',
                }}>
                  <span className="text-[20px]/[26px] font-bold">YouTube</span>
                  <Image src={findusSocialMediaArrow} alt="findus-social-media-arrow" width={15} height={9} className="mt-2.5 hidden group-hover:block" />
                </div>
                <div className="group cursor-pointer flex items-start justify-between pt-4 px-6 bg-white rounded-xl h-[255px] absolute top-[108px] w-full" style={{
                  boxShadow: '0px -4px 24px 0px rgba(232, 117, 90, 1)',
                }}>
                  <span className="text-[20px]/[26px] font-bold">Xiaohongshu</span>
                  <Image src={findusSocialMediaArrow} alt="findus-social-media-arrow" width={15} height={9} className="mt-2.5 hidden group-hover:block" />
                </div>
                <div className="group cursor-pointer flex items-start justify-between pt-4 px-6 bg-white rounded-xl h-[255px] absolute top-[162px] w-full" style={{
                  boxShadow: '0px -4px 24px 0px rgba(232, 117, 90, 1)',
                }}>
                  <span className="text-[20px]/[26px] font-bold">Community</span>
                  <Image src={findusSocialMediaArrow} alt="findus-social-media-arrow" width={15} height={9} className="mt-2.5 hidden group-hover:block" />
                </div>
              </div>
              <div className="flex w-full absolute bottom-0 left-0 right-0">
                <Image src={findus3} alt="findus-bg-3" className="w-full" />
                <h3 className="font-bold text-[26px]/[29px] text-[#801C1C] absolute left-4 right-10 bottom-6">Social media</h3>
              </div>
            </div>

            {/* Contributor */}
            <div className="bg-[#A282DF] rounded-[24px] flex flex-col items-center relative w-[295px] h-[350px] overflow-hidden mx-[18px]">
              <div className="bg-white rounded-xl absolute w-[253px] h-[255px] top-[24px] left-[21px] right-[21px] bg-white pt-6 px-[18px]" style={{
                boxShadow: '0px -4px 24px 0px rgba(130, 92, 199, 1)',
              }}>
                <div className="text-[20px]/[24px]"><span className="text-gray-500">If you want to</span> participate in co-construction</div>
                <div className="w-[241px] h-[137px] absolute left-[10px] top-[74px]">
                  <Image src={findusContributor} alt="findus-contributor" width={241} height={137} />
                </div>
              </div>
              <div className="flex w-full absolute bottom-0 left-0 right-0">
                <Image src={findus4} alt="findus-bg-4" className="w-full" />
                <h3 className="font-bold text-[26px]/[29px] text-[#462382] absolute left-4 right-10 bottom-6">Contributor</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative pt-12 overflow-hidden">
        <div className="bg-[#00D183] px-4 md:px-11 pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="mx-auto flex-1 text-center md:text-left">
            <h2 className="text-[32px]/[36px] font-bold mb-6">
                 Let&apos;s start your Web3 Success way on OpenBuild!
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button 
                onClick={() => window.open('https://t.me/OpenBuildxyz/1')}
                className="rounded px-9 h-12 text-sm font-normal bg-transparent border text-gray hover:text-white hover:bg-gray"
              >
                      🎉 Join Community
              </Button>
              <Link href="/signup">
                <Button className="relative bg-gray text-white border-transparent rounded pl-9 pr-1 h-12 text-sm font-normal flex items-center gap-9 hover:bg-transparent hover:text-gray hover:border">
                        Sign Up <div className="w-10 h-10 bg-white rounded p-2 text-gray flex justify-center items-center"><ArrowUpRight size={24} /></div>
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute right-11 bottom-0 w-71 flex-shrink-0">
            <Image src={letsstart} alt="Illustration" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

