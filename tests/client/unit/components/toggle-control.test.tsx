import React from 'react';

import { describe, expect, it, jest } from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react';

import { ToggleControl } from '../../../../sources/client/src/components/toggle-control';
import { Set } from '../../../../sources/client/src/vo/set';

const options = new Set([
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
	{ label: 'Option 3', value: '3' },
]);

describe('EntitiesToggleControl', () => {
	it('renders correctly', () => {
		const { container } = render(
			<ToggleControl
				className="test-class"
				value={new Set(['1'])}
				options={options}
				onChange={() => {}}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('renders the NoOptionsMessage when there are no options', () => {
		const { container } = render(
			<ToggleControl
				className="test-class"
				value={new Set(['1'])}
				options={new Set()}
				onChange={() => {}}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('updates the value when one or more option are selected', () => {
		const onChange = jest.fn();

		render(
			<ToggleControl
				className="test-class"
				options={options}
				value={new Set([])}
				onChange={onChange}
			/>
		);

		fireEvent.click(screen.getByLabelText('Option 1'));

		expect(onChange).toHaveBeenCalledWith(new Set(['1']));
	});

	it('updates the value when one or more option are unselected', () => {
		const onChange = jest.fn();

		render(
			<ToggleControl
				className="test-class"
				options={options}
				value={new Set(['1', '2'])}
				onChange={onChange}
			/>
		);

		fireEvent.click(screen.getByLabelText('Option 1'));

		expect(onChange).toHaveBeenCalledWith(new Set(['2']));
	});
});
