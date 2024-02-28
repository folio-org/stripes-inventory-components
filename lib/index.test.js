import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import { Component } from './index';

describe('Component', () => {
  it('should display component', () => {
    const { getByText } = render(<Component text="stripes-inventory-components" />);
    expect(getByText('stripes-inventory-components')).toBeVisible();
  });
});
