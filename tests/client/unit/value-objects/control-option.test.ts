/**
 * External dependencies
 */
import { describe, it, expect } from '@jest/globals';

/**
 * Internal dependencies
 */
import { ControlOption } from '../../../../sources/client/src/value-objects/control-option';
import { ImmutableRecord } from '../../../../sources/client/src/models/immutable-record';

describe( 'ControlOption', () => {
	it( 'should create a new ControlOption', () => {
		const controlOption = new ControlOption( 'label', 'value' );
		expect( controlOption.label ).toBe( 'label' );
		expect( controlOption.value ).toBe( 'value' );
	} );

	it( 'should throw an error when creating a new ControlOption with an empty label', () => {
		expect( () => new ControlOption( '', 'value' ) ).toThrow(
			'ControlOption: Label must be a non empty string.'
		);
	} );

	it( 'should throw an error when creating a new ControlOption with an empty value', () => {
		expect( () => new ControlOption( 'label', '' ) ).toThrow(
			'ControlOption: Value must be a non empty string.'
		);
	} );

	it( 'should create a new ControlOption with extra data', () => {
		const controlOption = new ControlOption(
			'label',
			'value',
			new ImmutableRecord( {
				key: 'value',
			} )
		);
		expect( controlOption.extra.get( 'key' ) ).toBe( 'value' );
	} );
} );
