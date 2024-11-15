import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  fireEvent,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { TagsFacet } from './TagsFacet';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import { FACETS } from '../../constants';

const TAGS = [{
  'label': 'important',
  value: 'important',
  count: 1,
}, {
  'label': 'new',
  value: 'new',
  count: 1,
}, {
  'label': 'urgent',
  value: 'urgent',
  count: 1,
}];

const filterAccordionTitle = 'Tags';
const mockOnChange = jest.fn();

const renderFilter = (props) => (renderWithIntl(
  <Router>
    <TagsFacet
      name={FACETS.INSTANCES_TAGS}
      facetOptions={{ instanceTags: [] }}
      accordionsStatus={{
        [FACETS.INSTANCES_TAGS]: true,
      }}
      activeFilters={{
        [FACETS.INSTANCES_TAGS]: [],
      }}
      onChange={mockOnChange}
      onToggle={() => {}}
      {...props}
    />
  </Router>,
  translationsProperties,
));

describe('TagsFilter component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display filter without tags', () => {
    renderFilter();
    expect(screen.getByRole('heading', { name: filterAccordionTitle })).toBeDefined();
  });

  it('should display filter accordion with tags', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
    });
    expect(screen.getByRole('heading', { name: filterAccordionTitle })).toBeDefined();
    expect(screen.getByText(TAGS[0].label)).toBeDefined();
  });

  it('should display filter accordion with tags and selected values', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
      activeFilters: {
        [FACETS.INSTANCES_TAGS]: ['urgent'],
      },
    });
    expect(screen.getByText('new')).toBeDefined();
  });

  it('should call onChange handler if new tag is clicked', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
    });

    fireEvent.click(screen.getByText('new'));

    expect(mockOnChange).toHaveBeenCalledWith({
      name: 'instancesTags',
      values: ['new'],
    });
  });

  it('should call onChange handler if clear btn is clicked', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
      activeFilters: {
        [FACETS.INSTANCES_TAGS]: ['urgent'],
      },
    });

    fireEvent.click(screen.getAllByLabelText('Clear selected Tags filters')[0]);

    expect(mockOnChange).toHaveBeenCalledWith({
      name: 'instancesTags',
      values: [],
    });
  });
});
