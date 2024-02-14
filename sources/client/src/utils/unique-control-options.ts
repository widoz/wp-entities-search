import EntitiesSearch from '@types';

import { Set } from '../vo/set';

// TODO Is this necessary due the new Set implementation?
export function uniqueControlOptions<V>(
	set: Set<EntitiesSearch.ControlOption<V>>
): Set<EntitiesSearch.ControlOption<V>> {
	let uniqueOptions = Set.new<EntitiesSearch.ControlOption<V>>();
	const temp: Array<EntitiesSearch.ControlOption<V>['value']> = [];

	for (const option of set) {
		if (!temp.includes(option.value)) {
			uniqueOptions = uniqueOptions.add(option);
		}

		temp.push(option.value);
	}

	return uniqueOptions;
}
