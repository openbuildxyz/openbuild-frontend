/*
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

import { isFunction } from 'lodash'
import React from 'react'
import Select, { components } from 'react-select'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/utils'

export const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className="h-5 w-5" />
    </components.DropdownIndicator>
  )
}

export const ClearIndicator = props => {
  return (
    <components.ClearIndicator {...props}>
      <XMarkIcon className="h-4 w-4" />
    </components.ClearIndicator>
  )
}

export const MultiValueRemove = props => {
  return (
    <components.MultiValueRemove {...props}>
      <XMarkIcon className="h-3 w-3" />
    </components.MultiValueRemove>
  )
}

export function ReactSelect({
  value,
  isMulti,
  name,
  options,
  placeholder,
  styles,
  onChange,
  className,
  classNamePrefix,
  isClearable,
  isSearchable = true
}) {
  return (
    <Select
      value={value}
      isMulti={isMulti}
      name={name}
      options={options}
      placeholder={placeholder}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: '40px',
          borderRadius: '8px',
          ...(styles && isFunction(styles.control) && styles.control())
        }),
        option: (styles) => ({
          ...styles,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }),
        menu: (styles) => ({
          ...styles,
          width: '100%!important',
        }),
      }}
      isSearchable={isSearchable}
      components={{ MultiValueRemove, ClearIndicator, DropdownIndicator }}
      onChange={onChange}
      className={classNames('react-select-container', className)}
      classNamePrefix={classNames(classNamePrefix, 'react-select')}
      isClearable={isClearable}
    />
  )
}
