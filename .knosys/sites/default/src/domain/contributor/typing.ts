import type { PickCollectionData } from '@/types';

type InternalContributor = PickCollectionData<'contributors'>;
type ComplexKey = 'nickname' | 'github' | 'twitter' | 'homepage' | 'org';

type Contributor = Omit<InternalContributor, ComplexKey> & {
  nickname: string;
  github: string;
  twitter?: string;
  homepage?: string;
  org: {
    name: string;
    homepage?: string;
  };
};

type ContributorMap = Record<string, InternalContributor>;

export type { InternalContributor, Contributor, ContributorMap };
