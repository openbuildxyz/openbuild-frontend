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

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HomeTopBg from 'public/images/about/about-top-bg.png';
// Placeholder for other images
import DefaultAvatar from 'public/images/about/avatar.png'; // Just a placeholder
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
      <div className="relative pt-14 pb-24 overflow-hidden">
        {/* Background gradient from green to white */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image src={HomeTopBg} alt="Background" fill className="object-cover" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-lg mb-4">About OpenBuild</p>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold mb-9">
            Bridge Web2 to Web3
          </h1>
          <p className="max-w-2xl mx-auto mb-7 text-[22px] font-bold">
            OpenBuild is the Biggest Web3 Open-Source Community in Asia. 
          </p>

          <p className="max-w-2xl mx-auto mb-9 text-[22px]">
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

          <p className="max-w-[360px] mx-auto mb-9 text-base leading-relaxed">
            Backed by among the most influential developer and open-source communities in China.
          </p>

          {/* Stats Cards */}
          <div 
            className="flex flex-wrap justify-center gap-4 md:gap-[120px] max-w-4xl mx-auto px-6 md:px-8 py-8 rounded-full border-2"
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
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.num}</div>
                <div className="text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* We're working on Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-[1680px] mx-auto px-11">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">We&apos;re working on</h2>
          <p className="text-center mb-2 max-w-2xl mx-auto text-base">
            Explore our services, witness our success stories, and join us to <span className="font-bold">build the next milestone together.</span>
          </p>
          <p className="text-center text-sm mb-10">
            Let&apos;s discuss the next big thing in Web3. &gt; <a href="#" className="underline">Book a call</a>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map(service => (
              <div key={service.id} className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden z-0 pt-[46%]">
                <div className="absolute top-0 left-0 h-52 w-full overflow-hidden z-[-1]">
                  <Image src={service.image} alt={service.title} className="object-contain" />
                </div>
                <div className="flex flex-col flex-1 rounded-xl z-1 bg-white" style={{
                }}>
                  <div className="px-6 py-5 flex-1">
                    <div className="text-xs mb-1">Services {service.id}</div>
                    <h3 className="font-bold text-base mb-3 leading-tight">{service.title}</h3>
                    <ul className="space-y-1.5 mb-6 flex-grow">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="mr-2">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t p-6 mt-auto" style={{
                    borderColor: 'rgba(26, 26, 26, 0.06)',
                  }}>
                    <Link href={service.link} className="flex items-center justify-between text-sm font-medium hover:text-black">
                        More <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Open-Source Ecosystem */}
      <div className="py-12 md:py-16">
        <div className="max-w-[1370px] mx-auto px-4 md:px-11">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Our Open-Source Ecosystem</h2>
          <div className="text-center mb-10">
            <a href="#" className="text-sm inline-flex items-center">
               For more projects, please visit &gt; <span className="underline">View More</span>
            </a>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-0">
            {ecosystem.map((project, idx) => (
              <div key={idx} className="rounded-xl shadow-sm hover:shadow-md transition-shadow py-8 px-6 flex gap-5 border bg-[#F8F8F8]" style={{
                margin: '-0.5px',
              }}>
                <div className="w-18 h-18 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image src={project.icon} alt={project.name} width={72} height={72} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1">{project.name}</h3>
                  <p className="text-xs mb-2 line-clamp-2">{project.description}</p>
                  <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 flex items-center gap-1">
                    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Find Us Here</h2>
          <p className="text-center mb-10 max-w-2xl mx-auto text-base">
              Whether you&apos;re looking for updates, events, resources, or a place to meet fellow builders, you can find us here and stay plugged in.
          </p>
           
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* WeChat */}
            <div className="bg-[#BBEF96] rounded-2xl p-6 flex flex-col items-center text-center h-full relative">
              <div className="bg-white p-2 rounded-lg mb-4">
                <Image src={QRCode} alt="WeChat" width={100} height={100} className="w-24 h-24" />
              </div>
              <h3 className="font-bold text-sm">WeChat Public Account</h3>
              <div className="absolute bottom-4 right-4 text-2xl opacity-50 pointer-events-none">👆</div>
            </div>

            {/* Email */}
            <div className="bg-[#FFF8C5] rounded-2xl p-6 flex flex-col justify-between h-full">
              <div className="mt-4">
                <p className="text-xs mb-2 text-gray-700">For business cooperation, please contact us.</p>
                <a href="mailto:build@openbuild.xyz" className="font-bold text-sm underline decoration-dotted">build@openbuild.xyz</a>
              </div>
              <div className="mt-6 font-bold text-base">OpenBuild E-mail</div>
            </div>

            {/* Social Media */}
            <div className="bg-[#FFAB91] rounded-2xl p-6 flex flex-col h-full">
              <div className="space-y-1 bg-white/50 rounded-xl p-4 mb-4 flex-1">
                <div className="flex justify-between items-center py-1 border-b border-white/20">
                  <span className="text-sm font-bold">Bilibili</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/20">
                  <span className="text-sm font-bold">YouTube</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/20">
                  <span className="text-sm font-bold">Xiaohongshu</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-bold">Community</span>
                </div>
              </div>
              <div className="font-bold text-base text-white">Social media</div>
            </div>

            {/* Contributor */}
            <div className="bg-[#C7B9FF] rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="bg-white rounded-xl p-4 text-center transform rotate-3 shadow-sm">
                <div className="text-xs text-gray-500 mb-2">If you want to participate in co-construction</div>
                <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-2 overflow-hidden">
                  <Image src={DefaultAvatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-xs">Web3 Dev</div>
              </div>
              <div className="mt-6 font-bold text-base text-white">Contributor</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative pt-12 overflow-hidden">
        <div className="bg-[#00D183] px-4 md:px-8 pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-6xl mx-auto flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                 Let&apos;s start your Web3 Success way on OpenBuild!
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button 
                onClick={() => window.open('https://t.me/OpenBuildxyz/1')}
                className="rounded-lg px-6 h-11 text-sm font-normal"
              >
                      🎉 Join Community
              </Button>
              <Link href="/signup">
                <Button className="bg-black !text-white hover:bg-gray-800 !border-none rounded-lg px-6 h-11 text-sm font-normal flex items-center gap-2">
                        Sign Up <ArrowUpRight size={14} />
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

