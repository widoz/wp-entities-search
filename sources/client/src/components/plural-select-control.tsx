/**
 * External dependencies
 */
import EntitiesSearch from '@types';
import classnames from 'classnames';
import React, { JSX } from 'react';

/**
 * Internal dependencies
 */
import { Set } from '../models/set';
import { NoOptionsMessage } from './no-options-message';

export function PluralSelectControl(
	props: EntitiesSearch.BaseControl< EntitiesSearch.Value > & {
		className?: string;
	}
): JSX.Element {
	const [ selected, setSelected ] = React.useState( props.value );
	const className = classnames(
		props.className,
		'wes-select-control',
		'wes-select-control--plural'
	);

	const onChange = ( event: React.ChangeEvent< HTMLSelectElement > ) => {
		if ( event.target.selectedOptions.length <= 0 ) {
			props.onChange( new Set() );
		}

		const selectedOptions = Array.from( event.target.selectedOptions ).map(
			( option ) => option.value
		);
		const selectedValues = props.options
			.filter( ( option ) =>
				selectedOptions.includes( String( option.value ) )
			)
			.map( ( option ) => option.value );

		setSelected( selectedValues );
		props.onChange( selectedValues );
	};

	if ( props.options.length() <= 0 ) {
		return <NoOptionsMessage />;
	}

	return (
		<select
			multiple
			className={ className }
			value={ selected.toArray() as Array< string > }
			onChange={ onChange }
		>
			{ props.options.map( ( option ) => (
				<option
					key={ option.value }
					className={ `wes-select-control-item wes-select-control-item--${ option.value }` }
					value={ option.value }
				>
					{ option.label }
				</option>
			) ) }
		</select>
	);
}
