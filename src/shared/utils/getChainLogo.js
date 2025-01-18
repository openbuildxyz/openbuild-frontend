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

import { mainnet, polygon, arbitrum, optimism, arbitrumGoerli, sepolia, bsc } from 'wagmi/chains';

export function getChainLogo(chainId) {
  switch (chainId) {
  case mainnet.id || sepolia.id:
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4817 4.29043L7.08715 11.516C6.91315 11.8019 7.00806 12.1725 7.29743 12.3421L11.692 14.9163C11.8818 15.0279 12.1182 15.0279 12.308 14.9163L16.7026 12.3421C16.9919 12.1725 17.0869 11.8019 16.9129 11.516L12.5192 4.29043C12.2838 3.90319 11.7171 3.90319 11.4817 4.29043Z" fill="#6B8AFF"/>
      <path d="M15.7897 15.0102C15.7897 14.999 15.7878 14.9888 15.7869 14.9786C15.785 14.9684 15.7831 14.9582 15.7813 14.948C15.7785 14.9359 15.7748 14.9248 15.7711 14.9127C15.7683 14.9035 15.7655 14.8951 15.7608 14.8868C15.7552 14.8738 15.7478 14.8608 15.7404 14.8487C15.7366 14.8422 15.7329 14.8348 15.7283 14.8283C15.7153 14.8098 15.7013 14.7912 15.6846 14.7754C15.6678 14.7597 15.6502 14.7448 15.6316 14.7318C15.625 14.7272 15.6185 14.7244 15.6111 14.7198C15.599 14.7123 15.586 14.7049 15.573 14.6993C15.5646 14.6956 15.5553 14.6928 15.546 14.6891C15.5348 14.6854 15.5228 14.6817 15.5107 14.6789C15.5004 14.6761 15.4902 14.6743 15.48 14.6734C15.4697 14.6715 15.4595 14.6706 15.4484 14.6706C15.4363 14.6706 15.4251 14.6697 15.413 14.6706C15.4046 14.6706 15.3963 14.6724 15.387 14.6734C15.374 14.6752 15.3609 14.6761 15.3479 14.6789C15.3442 14.6789 15.3405 14.6817 15.3368 14.6826C15.2968 14.6928 15.2586 14.7086 15.2233 14.7318L12.3311 16.4363C12.1265 16.5569 11.8735 16.5569 11.6689 16.4363L8.77673 14.7318C8.74139 14.7086 8.70326 14.6928 8.66327 14.6826C8.65955 14.6817 8.65583 14.6799 8.65211 14.6789C8.63909 14.6761 8.62607 14.6752 8.61305 14.6734C8.60468 14.6724 8.59631 14.6715 8.58701 14.6706C8.57492 14.6706 8.56376 14.6706 8.55167 14.6706C8.54144 14.6706 8.53029 14.6724 8.52006 14.6734C8.50983 14.6752 8.4996 14.6771 8.48937 14.6789C8.47728 14.6817 8.46612 14.6854 8.45403 14.6891C8.44473 14.6919 8.43636 14.6956 8.42706 14.6993C8.41404 14.7049 8.40102 14.7123 8.38893 14.7198C8.38242 14.7235 8.37498 14.7272 8.36847 14.7318C8.34987 14.7448 8.33127 14.7587 8.31546 14.7754C8.29965 14.7921 8.28477 14.8098 8.27175 14.8283C8.2671 14.8348 8.26431 14.8413 8.25966 14.8487C8.25222 14.8617 8.24478 14.8738 8.2392 14.8868C8.23548 14.8951 8.23269 14.9044 8.22897 14.9127C8.22525 14.9248 8.22153 14.9359 8.21874 14.948C8.21595 14.9582 8.21409 14.9684 8.21316 14.9786C8.2113 14.9888 8.21037 15 8.21037 15.0102C8.21037 15.0213 8.20944 15.0334 8.21037 15.0445C8.21037 15.0538 8.21223 15.0621 8.21316 15.0714C8.21502 15.0844 8.21595 15.0974 8.21874 15.1095C8.21967 15.115 8.22153 15.1197 8.22339 15.1243C8.23455 15.167 8.25315 15.2069 8.28012 15.244L11.4681 19.7265C11.7275 20.0911 12.2706 20.0911 12.5301 19.7265L15.718 15.244C15.745 15.2069 15.7636 15.167 15.7748 15.1243C15.7757 15.1197 15.7785 15.1141 15.7794 15.1095C15.7822 15.0965 15.7831 15.0844 15.785 15.0714C15.7859 15.0621 15.7869 15.0538 15.7878 15.0445C15.7878 15.0334 15.7878 15.0213 15.7878 15.0102H15.7897Z" fill="#6B8AFF"/>
    </svg>;
      
  case polygon.id:
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8793 14.9238L19.6748 12.7103C19.8758 12.5934 20 12.3751 20 12.1404V7.71327C20 7.4786 19.8748 7.26022 19.6748 7.14336L15.8793 4.9298C15.6783 4.81295 15.429 4.81295 15.228 4.9298L11.4325 7.14336C11.2315 7.26022 11.1073 7.4786 11.1073 7.71327V15.625L8.44587 17.1767L5.78441 15.625V12.5206L8.44587 10.9689L10.2009 11.9929V9.91054L8.77108 9.07627C8.67247 9.0188 8.55964 8.98815 8.44587 8.98815C8.33209 8.98815 8.21831 9.0188 8.12065 9.07627L4.32521 11.2898C4.12421 11.4067 4 11.6251 4 11.8597V16.2868C4 16.5206 4.12516 16.7399 4.32521 16.8568L8.12065 19.0703C8.32166 19.1872 8.57102 19.1872 8.77203 19.0703L12.5675 16.8568C12.7685 16.7399 12.8927 16.5215 12.8927 16.2868V8.37514L12.941 8.34736L15.5541 6.82344L18.2156 8.37514V11.4795L15.5541 13.0312L13.801 12.0092V14.0915L15.228 14.9238C15.429 15.0407 15.6783 15.0407 15.8793 14.9238Z" fill="#9558FF"/>
    </svg>;
      
  case arbitrum.id || arbitrumGoerli.id:
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.9">
        <path d="M13.2427 13.2169L12.4311 15.3416C12.409 15.4007 12.409 15.465 12.4311 15.5241L13.8274 19.1799L15.4425 18.2896L13.5041 13.2169C13.4601 13.1001 13.2867 13.1001 13.2427 13.2169Z" fill="#00A3FF"/>
        <path d="M14.8703 9.6438C14.8263 9.52694 14.653 9.52694 14.6089 9.6438L13.7973 11.7685C13.7753 11.8275 13.7753 11.8919 13.7973 11.951L16.0851 17.9362L17.7001 17.0459L14.8703 9.6438Z" fill="#00A3FF"/>
        <path d="M12.0006 4.99142C12.0405 4.99142 12.0804 5.00192 12.1161 5.0203L18.2752 8.41475C18.3467 8.45415 18.3907 8.52768 18.3907 8.60516V15.3927C18.3907 15.4715 18.3467 15.5437 18.2752 15.5831L12.1161 18.9776C12.0817 18.9973 12.0405 19.0065 12.0006 19.0065C11.9607 19.0065 11.9208 18.996 11.885 18.9776L5.72599 15.5858C5.65446 15.5464 5.61043 15.4728 5.61043 15.3954V8.60647C5.61043 8.52768 5.65446 8.45546 5.72599 8.41607L11.885 5.02162C11.9208 5.00192 11.9607 4.99142 12.0006 4.99142ZM12.0006 4C11.7818 4 11.5617 4.05384 11.365 4.16283L5.20735 7.55596C4.8139 7.77263 4.57178 8.17314 4.57178 8.60647V15.3941C4.57178 15.8274 4.8139 16.2279 5.20735 16.4446L11.3664 19.839C11.5631 19.9467 11.7818 20.0018 12.002 20.0018C12.2207 20.0018 12.4408 19.948 12.6375 19.839L18.7966 16.4446C19.19 16.2279 19.4321 15.8274 19.4321 15.3941V8.60647C19.4321 8.17314 19.19 7.77263 18.7966 7.55596L12.6362 4.16283C12.4394 4.05384 12.2193 4 12.0006 4Z" fill="#00A3FF"/>
        <path d="M11.4819 8.12061H9.92048C9.80355 8.12061 9.69899 8.1902 9.6591 8.29525L6.31201 17.0538L7.92709 17.9441L11.6126 8.29919C11.647 8.21252 11.5796 8.12061 11.4819 8.12061Z" fill="#00A3FF"/>
        <path d="M14.2143 8.12061H12.6529C12.536 8.12061 12.4314 8.1902 12.3915 8.29525L8.56982 18.2961L10.1849 19.1864L14.345 8.29919C14.378 8.21252 14.3106 8.12061 14.2143 8.12061Z" fill="#00A3FF"/>
      </g>
    </svg>;
      
  case optimism.id:
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.21407 16.0001C6.35029 16.0001 5.64303 15.7928 5.0923 15.3783C4.54737 14.9579 4.2749 14.3539 4.2749 13.5782C4.2749 13.4124 4.29229 13.2169 4.32708 12.9801C4.41983 12.4471 4.55317 11.8076 4.72708 11.0556C5.21984 9.01852 6.49522 8 8.54742 8C9.10395 8 9.6083 8.09475 10.0489 8.29016C10.4895 8.47373 10.8373 8.75797 11.0924 9.13695C11.3475 9.51001 11.475 9.95413 11.475 10.4693C11.475 10.6233 11.4576 10.8187 11.4228 11.0556C11.3127 11.7129 11.1851 12.3583 11.0286 12.9801C10.7735 13.9927 10.3387 14.7566 9.71265 15.2599C9.09235 15.7573 8.25756 16.0001 7.21407 16.0001ZM7.37059 14.4013C7.77639 14.4013 8.11843 14.2769 8.40249 14.0341C8.69235 13.7913 8.90105 13.4183 9.02279 12.909C9.1909 12.2103 9.31844 11.6063 9.4054 11.0852C9.43439 10.9312 9.45178 10.7713 9.45178 10.6055C9.45178 9.93045 9.10974 9.59291 8.41988 9.59291C8.01408 9.59291 7.66625 9.71727 7.37639 9.96005C7.09233 10.2028 6.88943 10.5759 6.76769 11.0852C6.63435 11.5826 6.50681 12.1866 6.37348 12.909C6.34449 13.0571 6.3271 13.211 6.3271 13.3768C6.3213 14.0637 6.67493 14.4013 7.37059 14.4013Z" fill="#FF0420"/>
      <path d="M11.9672 16.0001C11.8796 16.0001 11.817 15.9757 11.7669 15.9209C11.7293 15.8601 11.7168 15.7931 11.7293 15.7139L13.3509 8.28615C13.3634 8.20092 13.4073 8.13394 13.4824 8.07915C13.5513 8.02435 13.6264 8 13.7078 8H16.8321C17.7024 8 18.3974 8.17656 18.9233 8.5236C19.4555 8.87672 19.7247 9.38206 19.7247 10.0457C19.7247 10.2344 19.6997 10.4353 19.6558 10.6423C19.4617 11.5191 19.0673 12.1644 18.4662 12.5845C17.8777 13.0046 17.07 13.2116 16.0432 13.2116H14.4591L13.9207 15.7139C13.9019 15.7992 13.8643 15.8662 13.7892 15.9209C13.7203 15.9757 13.6452 16.0001 13.5638 16.0001H11.9672ZM16.1246 11.6347C16.4564 11.6347 16.7382 11.5495 16.9824 11.3729C17.2328 11.1964 17.3956 10.9468 17.477 10.618C17.502 10.4901 17.5145 10.3745 17.5145 10.277C17.5145 10.0579 17.4457 9.88739 17.3142 9.77171C17.1827 9.64994 16.951 9.58906 16.6317 9.58906H15.223L14.7785 11.6347H16.1246Z" fill="#FF0420"/>
    </svg>;
      
  case bsc.id:
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.279 11.3421L16.2704 9.48437H16.2771L14.6992 8.55553L11.9954 10.1498L9.30786 8.55553L7.73094 9.48437V11.3421L10.4348 12.9286V16.1094L12.005 17.0296L13.5752 16.1094V12.9286L16.279 11.3421ZM11.9963 3.79688L7.72998 6.31226L9.30017 7.24111L11.9963 5.64687L14.7002 7.24111L16.2704 6.31226L11.9963 3.79688ZM6.60375 15.1726L6.5951 11.9995L5.02586 11.0716V16.1101L9.2999 18.6168V16.7591L6.60375 15.1726ZM6.5951 10.6755V8.82644L8.17298 7.8976L6.5951 6.96875L5.0249 7.8976V9.74663L6.5951 10.6755ZM11.9961 6.96875L10.4259 7.8976L11.9961 8.82644L13.5739 7.8976L11.9961 6.96875ZM9.29968 13.5861L7.72949 12.6572V14.5149L9.29968 15.4351V13.5861ZM11.9958 18.3534L10.4256 17.4245V19.2736L11.9958 20.2024L13.5737 19.2736V17.4245L11.9958 18.3534ZM17.3958 6.96875L15.8256 7.8976L17.3958 8.82644V10.6755L18.9737 9.74663V7.8976L17.3958 6.96875ZM18.9747 11.0707L17.4045 11.9995L17.3958 15.1726L14.7006 16.7582V18.6159L18.9747 16.1091V11.0707ZM16.2699 14.5149L14.6997 15.4351V13.5861L16.2699 12.6572V14.5149Z" fill="#EAB200"/>
    </svg>;
      
  default:
    return null;
  }
}
