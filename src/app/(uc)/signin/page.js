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

import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { EyeIcon, EyeSlashIcon } from '@/components/icon/outlined';
import Loader from '@/components/Loader';
import { isEmpty } from '@/utils';
import { wrapOnChange } from '@/utils/form';

import { getOauthSourceFromParams } from '#/domain/auth/helper';
import { signin, emailCodeLogin } from '#/services/auth';

import { NavButtonStyle } from '../helper';
import LoginTypeSwitcher from './LoginTypeSwitcher';
import VerifyCodeLogin from './VerifyCodeLogin';

const SigninAfterStyle = 'after:content-[\'\'] after:absolute after:right-[-12px] after:bottom-0 after:w-3 after:h-3 after:bg-signin-gradient';

export default function Login() {
  const emailFieldName = 'Email';
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [loginType, setLoginType] = useState('verifyCode');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
    setValue,
    getValues,
  } = useForm();
  const watchAllFields = watch();

  const handleChangeLoginType = () => {
    setLoginType(prevLoginType => {
      const loginType = prevLoginType === 'verifyCode' ? 'password' : 'verifyCode';
      clearErrors();
      const email = getValues(emailFieldName);
      reset();
      setValue(emailFieldName, email);
      return loginType;
    });
  };

  const onSubmit = async data => {
    setLoading(true);

    try {
      const response =
        loginType === 'verifyCode'
          ? await emailCodeLogin(data.Email, data.VerifyCode)
          : await signin(data.Email, data.Password);

      if (response.code === 200) {
        const signType = loginType === 'verifyCode' ? 'verifyCode' : 'email';
        window.localStorage.setItem('signType', signType);

        const signInResponse = await signIn('credentials', {
          token: response.data.token,
          redirect: false,
          callbackUrl: decodeURIComponent(
            getOauthSourceFromParams(searchParams) ||
            searchParams?.get('from') ||
            searchParams?.get('callbackUrl') ||
            '/profile'
          ),
        });

        if (signInResponse?.ok && signInResponse.url) {
          window.location.href = signInResponse.url;
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const emailField = register(emailFieldName, { required: true, pattern: /^\S+@\S+$/i });
  emailField.onChange = wrapOnChange(emailField.onChange);

  const pwdField = register('Password', {
    required: loginType === 'password',
    minLength: 6,
    maxLength: 20,
  });
  pwdField.onChange = wrapOnChange(pwdField.onChange);

  return (
    <>
      <div>
        <div>
          <button className={clsx(NavButtonStyle, SigninAfterStyle, 'active')}>Sign in</button>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className={'h-12 w-full rounded-tr-xl border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100'}
              placeholder="Email Address"
              {...emailField}
            />
            {loginType === 'verifyCode' ? (
              <VerifyCodeLogin
                register={register}
                loginType={loginType}
                email={watchAllFields.Email}
              />
            ) : (
              <div className="mt-[2px] flex items-center bg-[#f1f1f1] pr-3 ">
                <input
                  type={passwordType}
                  placeholder="Password"
                  {...pwdField}
                  className="mt-[2px] h-12 w-full border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100"
                />
                {passwordType === 'password' ? (
                  <EyeIcon onClick={() => setPasswordType('text')} className="w-5 h-5 cursor-pointer" />
                ) : (
                  <EyeSlashIcon onClick={() => setPasswordType('password')} className="w-5 h-5 cursor-pointer" />
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={
                !watchAllFields.Email ||
                (loginType === 'password' && !watchAllFields.Password) ||
                (loginType === 'verifyCode' && !watchAllFields.VerifyCode) ||
                loading
              }
              className="flex items-center justify-center w-full h-12 text-white rounded-t-none rounded-xl bg-gray disabled:opacity-20"
            >
              {loading && <Loader classname="mr-2" />}
              <span>Continue</span>
            </button>
          </form>

          {!isEmpty(errors) && watchAllFields.Email !== '' && (
            <p className="mt-4 text-xs text-center text-red">
              {loginType === 'password'
                ? 'The email or password is wrong.'
                : 'The email or code is wrong.'}
            </p>
          )}

          <LoginTypeSwitcher
            loginType={loginType}
            handleChangeLoginType={handleChangeLoginType}
          />

          {loginType == 'password' && (
            <div className="mt-6 text-center">
              Forget your password?&nbsp;
              <Link href="/forgot" className="cursor-pointer text-sm font-bold text-[#01DB83] hover:underline">
                Reset
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
