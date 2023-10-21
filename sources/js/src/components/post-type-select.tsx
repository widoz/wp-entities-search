import EntitiesSearch from '@types';
import React, { JSX } from 'react';
import Select from 'react-select';

export function PostTypeSelect<V>(
	props: EntitiesSearch.PostTypeSelect<V>
): JSX.Element | null {
	const value = props.options.find((option) => option.value === props.value);

	return (
		<Select
			isMulti={false}
			value={value ?? props.options.first() ?? null}
			options={props.options.toArray()}
			onChange={(opt) => props.onChange(opt?.value ?? null)}
		/>
	);
}
