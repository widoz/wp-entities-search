import EntitiesSearch from '@types';
import { Set } from 'immutable';

import { useEntityRecords } from './use-entity-records';

/**
 * Hook to obtain the `viewable` post types only.
 * This is an api on top of `useEntityRecords` to facilitate the usage of the `viewable` post types.
 *
 * @public
 */
export function useQueryViewablePostTypes(): EntitiesSearch.EntitiesRecords<EntitiesSearch.ViewablePostType> {
	const entitiesRecords = useEntityRecords<EntitiesSearch.PostType<'edit'>>(
		'root',
		'postType'
	);

	const viewablePostTypes = entitiesRecords
		.records()
		.filter((postType) => postType.viewable);

	// TODO Need to convert PostType to ViewablePostType
	return {
		...entitiesRecords,
		// TODO Find a way to remove the ignore
		// @ts-ignore
		records: () => Set(viewablePostTypes),
	};
}
