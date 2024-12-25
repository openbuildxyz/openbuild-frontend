import type { SupportedLocale } from '@/types';
import { getCollection } from '@/utils';

import type { InternalContributor, Contributor, ContributorMap } from './typing';
import { getGitHubHandler, resolveContributorList } from './helper';

const contributors: InternalContributor[] = await getCollection('contributors');
const contributorMap: ContributorMap = contributors.reduce((p, c) => ({
  ...p,
  [getGitHubHandler(c)]: c,
}), {});

function getList(locale: SupportedLocale): Contributor[] {
  return [];
}

function getCoreTeamMemberList(locale: SupportedLocale) {
  return resolveContributorList(['ourai'], contributorMap, locale);
}

export { getList, getCoreTeamMemberList };
