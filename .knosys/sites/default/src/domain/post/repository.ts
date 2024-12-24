import type { SupportedLocale, LocaleValue } from '@/types';
import { getCollection, unwrapLocalValue } from '@/utils';

import type { InternalPost, Post } from './typing';

const posts: InternalPost[] = await getCollection('posts');

function getList(locale: SupportedLocale): Post[] {
  return posts
    .map(({ date, ...others }) => {
      const unwrapped = unwrapLocalValue<Post>(others as LocaleValue<Post>, locale);

      return unwrapped ? { ...unwrapped, date } : undefined;
    })
    .filter(post => !!post)
    .slice()
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export { getList };
