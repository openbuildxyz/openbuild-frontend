import { getCollection as getAstroCollection } from 'astro:content';

import type { DataCollectionKey, PickCollectionData } from '../types/content';

async function getCollection<K extends DataCollectionKey, E extends PickCollectionData<K>>(
  key: K,
  filter?: (entry: PickCollectionData<K>) => boolean,
): Promise<E[]> {
  return (await getAstroCollection(key, filter ? (({ data }) => filter(data)) : undefined)).map(({ data }) => data)
}

export { getCollection };
