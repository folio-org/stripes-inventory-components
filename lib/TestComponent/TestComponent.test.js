import { render } from '@folio/jest-config-stripes/testing-library/react';

import { TestComponent } from './TestComponent';

describe('TestComponent', () => {
  it('should display passed text', () => {
    const { getByText } = render(<TestComponent text="stripes-inventory-components" />);

    expect(getByText('stripes-inventory-components')).toBeVisible();
  });
});
