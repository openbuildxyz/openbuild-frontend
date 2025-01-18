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

// import { classNames } from '@/utils'
import React, { forwardRef } from 'react';
import clsx from 'clsx';

// import Dots from '../Dots'
// import Loader from '../Loader'

// const SIZE = {
//   sm: 'rounded h-9 px-6 text-sm',
//   md: 'px-4 py-2 text-sm rounded h-12',
//   lg: 'text-lg rounded',
// }

// const TEXT = {
//   default: 'hover:text-white hover:bg-gray disabled:opacity-20',
//   red: 'bg-red',
//   gradient:
//     '!bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700',
//   gray: 'bg-dark-700',
// }

// const OUTLINED = {
//   default: 'border border-gray hover:bg-gray-300 disabled:opacity-20',
//   red: 'border-none bg-red/20 hover:bg-red/40 active:bg-red/60 text-red focus:bg-red/40',
//   gradient: 'border-none bg-purple/20 hover:bg-purple/40 active:bg-purple/60 text-purple focus:bg-purple/40',
//   gray: 'border-dark-700 hover:bg-dark-700/30 active:bg-dark-700/50 focus:bg-dark-700/30',
// }

// const CONTAINED = {
//   default: 'bg-gray text-white hover:opacity-90 disabled:opacity-20',
//   red: 'text-red',
//   gradient:
//     '!bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70',
// }

// const VARIANT = {
//   outlined: OUTLINED,
//   text: TEXT,
//   contained: CONTAINED,
// }

const SIZE = {
  xs: 'btn-xs font-normal',
  sm: 'btn-sm font-normal',
  lg: 'btn-lg',
  md: 'font-normal',
};
const VARIANT = {
  outlined: 'btn-outline',
  text: 'btn-ghost',
  contained: 'contained',
};

export const Button = forwardRef(({
  children,
  className = '',
  disabled,
  loading,
  fullWidth,
  startIcon = undefined,
  endIcon = undefined,
  variant='contained',
  size='md',
  ...rest
}, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      disabled={disabled || loading}
      className={clsx('btn hover:opacity-90 transition-all min-h-min disabled:shadow-none',
        variant ? VARIANT[variant]: '',
        SIZE[size],
        fullWidth ? 'w-full' : '',
        (!disabled || !loading) && 'btn-primary',
        (disabled || loading) && 'opacity-60',
        (disabled || loading) && variant === 'outlined' && 'border-gray-400',
        (disabled || loading) && variant === 'contained' && '!bg-gray !opacity-20 !text-white',
        className
      )}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner" />
          {children}
        </>
      ) : (
        <>
          {startIcon && startIcon}
          {children}
          {endIcon && endIcon}
        </>
      )}
    </button>
  );
});

// export const Button = React.forwardRef(
//   (
//     {
//       children,
//       className = '',
//       color = 'default',
//       size = 'md',
//       variant = 'text',
//       startIcon = undefined,
//       endIcon = undefined,
//       fullWidth = false,
//       loading,
//       disabled,
//       bold,
//       ...rest
//     },
//     ref
//   ) => {
//     return (
//       <button
//         {...rest}
//         ref={ref}
//         disabled={disabled || loading}
//         className={classNames(
//           VARIANT[variant]['default'],
//           // @ts-ignore TYPE NEEDS FIXING
//           SIZE[size],
//           // @ts-ignore TYPE NEEDS FIXING
//           variant,
//           bold ? 'font-bold' : '',
//           fullWidth ? 'w-full' : '',
//           'flex items-center justify-center gap-1',
//           className
//         )}
//       >
//         {loading ? (
//           <>
//             <Loader classname="mr-2" />
//             {children}
//           </>
//         ) : (
//           <>
//             {startIcon && startIcon}
//             {children}
//             {endIcon && endIcon}
//           </>
//         )}
//       </button>
//     )
//   }
// )

// export function ButtonError({ error, disabled, ...rest }) {
//   if (error) {
//     return <Button color="red" size="lg" disabled={disabled} {...rest} />
//   } else {
//     return <Button color="gradient" disabled={disabled} size="lg" {...rest} />
//   }
// }

// export const ButtonDotted = ({ pending, children, ...rest }) => {
//   const buttonText = pending ? <Dots>{children}</Dots> : children
//   return (
//     <Button {...rest} {...(pending && { disabled: true })}>
//       {buttonText}
//     </Button>
//   )
// }
