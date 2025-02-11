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

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/Button';
import { wrapOnChange } from '@/utils/form';

import { updateRespondentContacts } from '../../repository';
import style from './style.module.scss';

function FeedbackForm({ result, quiz }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    updateRespondentContacts({ ...data, id: result.quiz_id, quid: result.id })
      .then(res => {
        if (res.code === 200) {
          toast.success('Wallet updated');
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const walletField = register('address', { required: true });
  walletField.onChange = wrapOnChange(walletField.onChange);

  return (
    <form className={style.FeedbackForm} onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <input
          className="h-12 w-full rounded border-1 border-transparent px-6 text-sm placeholder:text-gray-1100"
          type="text"
          placeholder="Please enter your wallet address"
          {...walletField}
        />
      </div>
      <Button className="mt-4" loading={loading} fullWidth>Submit</Button>
      <div className={style['FeedbackForm-reminder']}>
        <p style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Reminder:</p>
        <ol>
          <li>Thanks for your participation, our rewards distribution rules are based on your rank. High rank participants will receive their corresponding rewards.</li>
          {quiz.reward_rule && <li>{quiz.reward_rule}</li>}
          <li>If any problems come to you during the process, please don’t hesitate to contact our assistant <span style={{ fontWeight: 'bold', color: '#1a1a1a', textDecoration: 'underline' }}>todoright</span> to get a hand.</li>
        </ol>
      </div>
      <Link className={style['FeedbackForm-link']} href={`/quiz/${quiz.id}`}>Re-practice</Link>
    </form>
  );
}

export default FeedbackForm;
