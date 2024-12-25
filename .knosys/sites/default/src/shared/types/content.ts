import type { CollectionEntry } from 'astro:content';

type DataCollectionKey = 'contributors' | 'posts';

type PickCollectionData<K extends DataCollectionKey> = CollectionEntry<K>['data'];

export type { DataCollectionKey, PickCollectionData };
