import type { SupportedLocale, PickCollectionData } from '@/types';

type PostLocale = {
  browseMore: string;
};

type InternalPost = PickCollectionData<'posts'>;

type Post = Omit<InternalPost, SupportedLocale> & {
  title: string;
  description: string;
  url: string;
};

export type { PostLocale, InternalPost, Post };
