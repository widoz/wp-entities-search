import EntitiesSearch from '@types';

import { Set } from '../../vo/set';

/**
 * @internal
 * @param state  The state of the reducer
 * @param action The action to be performed
 */
export function reducer<E, K>(
	state: EntitiesSearch.EntitiesState<E, K>,
	action: EntitiesSearch.StoreAction<E, K>
): EntitiesSearch.EntitiesState<E, K> {
	switch (action.type) {
		case 'UPDATE_ENTITIES':
			return {
				...state,
				entities: action.entities,
			};

		case 'UPDATE_KIND':
			return {
				...state,
				kind: action.kind,
			};

		case 'UPDATE_CONTEXTUAL_ENTITIES_OPTIONS':
			return {
				...state,
				contextualEntitiesOptions: action.contextualEntitiesOptions,
			};

		case 'UPDATE_CURRENT_ENTITIES_OPTIONS':
			return {
				...state,
				currentEntitiesOptions: action.currentEntitiesOptions,
			};

		case 'UPDATE_SELECTED_ENTITIES_OPTIONS':
			return {
				...state,
				selectedEntitiesOptions: action.selectedEntitiesOptions,
				entities: action.selectedEntitiesOptions.map(
					(option: EntitiesSearch.ControlOption<E>) => option.value
				),
			};

		case 'CLEAN_ENTITIES_OPTIONS':
			return {
				...state,
				selectedEntitiesOptions: new Set(),
				contextualEntitiesOptions: new Set(),
				currentEntitiesOptions: new Set(),
			};

		case 'UPDATE_ENTITIES_OPTIONS_FOR_NEW_KIND':
			return {
				...state,
				contextualEntitiesOptions: action.entitiesOptions,
				currentEntitiesOptions: action.entitiesOptions,
				selectedEntitiesOptions: new Set(),
				entities: new Set(),
				kind: action.kind,
			};

		case 'UPDATE_SEARCH_PHRASE':
			return {
				...state,
				searchPhrase: action.searchPhrase,
			};

		default:
			return state;
	}
}
