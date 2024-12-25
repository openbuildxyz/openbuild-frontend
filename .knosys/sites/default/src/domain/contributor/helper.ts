import type { SupportedLocale } from '@/types';
import { unwrapLocalValue } from '@/utils';

import type { InternalContributor, Contributor, ContributorMap } from './typing';

function getGitHubHandler(c: InternalContributor): string {
  return typeof c.github === 'string' ? c.github : c.github.username;
}

function resolveContributor({ avatar, title, ...others }: InternalContributor, locale: SupportedLocale): Contributor {
  return {
    nickname: unwrapLocalValue(others.nickname, locale),
    avatar,
    github: getGitHubHandler(others as InternalContributor),
    twitter: typeof others.twitter === 'object' ? unwrapLocalValue(others.twitter, locale) : others.twitter,
    homepage: typeof others.homepage === 'object' ? unwrapLocalValue(others.homepage, locale) : others.homepage,
    title,
    org: typeof others.org === 'string' ? { name: others.org } : (others.org || { name: '' }),
  };
}

function resolveContributorList(githubHandlers: string[], contributorMap: ContributorMap, locale: SupportedLocale) {
  return githubHandlers.map(githubHandler => resolveContributor(contributorMap[githubHandler], locale));
}

export { getGitHubHandler, resolveContributorList };
