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

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/Button';
import { OEditor } from '@/components/MarkDown';
import { BASE_INPUT_STYLE } from '@/constants/config';
import { renderMarkdown, renderHtml } from '@/utils/markdown';

import { fetchEmailTemplate, updateEmailTemplate } from '../../repository';
import FormField from './FormField';

function EmailTemplateFormView({ id, className }) {
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const { register, reset, handleSubmit } = useForm({ defaultValues: { title: '' } });
  const router = useRouter();

  useEffect(() => {
    setFetching(true);

    fetchEmailTemplate(id)
      .then(res => {
        if (res.code === 200) {
          reset({ title: res.data.course_challenges_extra_email_pass_title });
          setContent(renderMarkdown(res.data.course_challenges_extra_email_pass_html || ''));
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => setFetching(false));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitCallback = data => {
    setSubmitting(true);
    updateEmailTemplate(id, { title: data.title, body: renderHtml(content) })
      .then(res => {
        if (res.code === 200) {
          toast.success('E-mail template updated');
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form className={className} onSubmit={handleSubmit(submitCallback)}>
      <FormField label="Title">
        <input className={BASE_INPUT_STYLE} type="text" { ...register('title', { required: true }) } />
      </FormField>
      <FormField label="Body" className="mt-9">
        <OEditor value={content} onChange={setContent} />
      </FormField>
      <div className="flex justify-end mt-9">
        <div className="flex gap-2">
          <Button variant="outlined" type="button" disabled={fetching || submitting} onClick={() => router.replace('/creator/learn/challenges')}>Cancel</Button>
          <Button type="submit" loading={submitting} disabled={fetching}>Submit</Button>
        </div>
      </div>
    </form>
  );
}

export default EmailTemplateFormView;
